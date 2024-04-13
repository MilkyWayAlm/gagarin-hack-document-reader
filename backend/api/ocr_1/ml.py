# ! pip install ultralytics

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import torch
import cv2
import easyocr
from skimage.filters import threshold_local
from PIL import Image
from ultralytics import YOLO
import re
import base64
import json

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
check = (device.type == 'cuda')

model = YOLO('/weights/bestYolo8m_50epochs_good_dataset.pt').to(device)
reader = easyocr.Reader(['ru'], gpu=check)
print('reader finished')

album = ['udov_front', 'udov_back', 'passport_front']
book = ['pts', 'sts_front', 'sts_back', 'passport_back']

def yolo_predict(model, img):
    res = []
    results = model.predict(img, stream=True) 
    
    for result in results: 
        boxes = result.boxes.cpu().numpy()
        for box in boxes:
            r = box.xyxy[0].astype(int)
            class_id = int(box.cls[0])
            class_name = model.names[class_id]
            scores = box.conf[0]
            res.append((class_name, scores, r))
            
    return res


def crop_image(image, bbox):
    x1, y1, x2, y2 = bbox
    cropped_image = image[y1:y2, x1:x2]
    return cropped_image


def compare_white_pixels(image):
    width = image.shape[1]
    left_region = image[:, :int(width / 2)]
    right_region = image[:, int(width / 2):]

    left_white_pixels = np.sum(left_region == 255)
    right_white_pixels = np.sum(right_region == 255)
        
    return left_white_pixels > right_white_pixels


def rotate_to_book(image):
    height, width = image.shape[:2]
    
    if width > height:
        image = cv2.rotate(image, cv2.ROTATE_90_CLOCKWISE)
        
#     image_binary = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
#     image_binary = cv2.GaussianBlur(image_binary,(5,5),0)
#     _, image_binary = cv2.threshold(image_binary, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    
#     if not compare_white_pixels(image_binary):
#         image = cv2.rotate(image, cv2.ROTATE_180)
        
    return image


def rotate_to_album(image):
    height, width = image.shape[:2]
    
    if height > width:
        image = cv2.rotate(image, cv2.ROTATE_90_COUNTERCLOCKWISE)
        
#     image_binary = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
#     image_binary = cv2.GaussianBlur(image_binary,(5,5),0)
#     _, image_binary = cv2.threshold(image_binary, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    
#     if not compare_white_pixels(image_binary):
#         image = cv2.rotate(image, cv2.ROTATE_180)
        
    return image


def bw_scanner(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    T = threshold_local(gray, 21, offset = 5, method = "gaussian")
    return (gray > T).astype("uint8") * 255


def reduce_glare(image):
    blurred = cv2.GaussianBlur(image, (5, 5), 0)
    brightened = cv2.convertScaleAbs(blurred, alpha=1, beta=5)
    return brightened


def has_no_special_chars(s):
    return re.match(r'^[.%#№;:,\-\w\s]+$', s) is not None




def ocr(pic):
    
    results_default = reader.readtext(pic)
    df_default = pd.DataFrame(results_default, columns=['bbox', 'text', 'conf'])
    
    flipped_pic = cv2.rotate(pic, cv2.ROTATE_180)
    results_flipped = reader.readtext(flipped_pic)
    df_flipped = pd.DataFrame(results_flipped, columns=['bbox', 'text', 'conf'])
    ocr_ = pd.concat([df_default, df_flipped])
    
    
    df = ocr_.loc[ocr_['conf'] > 0.2]
    res = df[df['text'].apply(lambda x: len(x) > 1 and len(x) < 15 and sum(c.isalpha() for c in x) <= 2 and has_no_special_chars(x))]
    res['text'] = res['text'].apply(lambda x: re.sub(r'[!@#№$;%:^&?*()_\-+=/.,<>`~]', '', x))
    return res


def ocr_digits(pic):
    results_default = reader.readtext(pic, allowlist ='0123456789')
    df_default = pd.DataFrame(results_default, columns=['bbox', 'text', 'conf'])
    
    flipped_pic = cv2.rotate(pic, cv2.ROTATE_180)
    results_flipped = reader.readtext(flipped_pic)
    df_flipped = pd.DataFrame(results_flipped, columns=['bbox', 'text', 'conf'])
    ocr_ = pd.concat([df_default, df_flipped])
    
    df = ocr_.loc[ocr_['conf'] > 0.4]
    res = df[df['text'].apply(lambda x: len(x) > 1 and len(x) < 15 and sum(c.isalpha() for c in x) <= 2 and has_no_special_chars(x))]
    res['text'] = res['text'].apply(lambda x: re.sub(r'[!@#№$;%:^&?*()_\-+=/.,<>`~]', '', x))
    return res


def split_rows(df):
    new_rows = []
    for index, row in df.iterrows():
        texts = row['text'].split()
        if len(texts) > 1:
            for text in texts:
                new_row = row.copy()
                new_row['text'] = text
                new_rows.append(new_row)
        else:
            new_rows.append(row)
    return pd.DataFrame(new_rows)


def get_vu_data(df):
    filtered_rows = []
    for i in range(len(df) - 2):
        if (len(df.iloc[i]['text']) == 2 and 
            len(df.iloc[i+1]['text']) == 2 and 
            len(df.iloc[i+2]['text']) == 6):
            return df.iloc[i:i+3]
    return df


def check_text(text):
    if len(text) == 10:
        return True
    return False


def remove_spaces(df):
    df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)
    return df

def json2opencv(string_image):
    comma = string_image.index(',') + 1
    jpg_original = base64.b64decode(string_image[comma:])
    jpg_as_np = np.frombuffer(jpg_original, dtype=np.uint8)
    return cv2.imdecode(jpg_as_np, flags=1)

def work(string_image):
    image = json2opencv(string_image)
    predicts = yolo_predict(model, image)
    
    if len(predicts) == 0:
        return 'Документ не обнаружен'
    
    results = []
    
    for predict in predicts:
        type_, conf, rect = predict
        cropped = crop_image(image, rect)

        if type_ in album:
            doc = rotate_to_album(cropped)
        elif type_ in book:
            doc = rotate_to_book(cropped)

        if type_ == 'passport_front':
            try:
                res = ocr_digits(doc)
                res = split_rows(res)
                res = remove_spaces(res)
                res = res[res['text'].apply(lambda x: len(x) > 1)]
                data = get_vu_data(res)
                series_0, series_1, number = data.text.tolist()
                fields = {'type': 'personal_passport', 
                          'confidence': float(conf), 
                          'series': series_0 + series_1, 
                          'number': number, 
                          'page_number': 1}
                results.append(fields)
            except:
                fields = {'type': 'personal_passport', 
                          'confidence': float(conf), 
                          'series': 'none', 
                          'number': 'none', 
                          'page_number': 1}
                results.append(fields)
            
        if type_ == 'passport_back':
            fields = {'type': 'personal_passport', 
                      'confidence': float(conf), 
                      'series': 'none', 
                      'number': 'none', 
                      'page_number': 2}
            results.append(fields)
        
        elif type_ == 'udov_front': 
            try:
                res = ocr_digits(doc)
                df = res[res['text'].apply(check_text)]
                first_text_value = df.iloc[0]['text']
                series, number = first_text_value[:4], first_text_value[4:]
                fields = {'type': 'driver_license', 
                          'confidence': float(conf), 
                          'series': series, 
                          'number': number, 
                          'page_number': 1}
                results.append(fields)
            except:
                fields = {'type': 'driver_license', 
                          'confidence': float(conf), 
                          'series': 'none', 
                          'number': 'none', 
                          'page_number': 1}
                results.append(fields)
            
        elif type_ == 'udov_back':
            try:
                res = ocr_digits(doc)
                res = split_rows(res)
                res = remove_spaces(res)
                res = res[res['text'].apply(lambda x: len(x) > 1)]
                data = get_vu_data(res)
                series_0, series_1, number = data.text.tolist()
                fields = {'type': 'driver_license', 
                          'confidence': float(conf), 
                          'series': series_0 + series_1, 
                          'number': number, 
                          'page_number': 2}
                results.append(fields)
            except:
                fields = {'type': 'driver_license', 
                          'confidence': float(conf), 
                          'series': 'none', 
                          'number': 'none', 
                          'page_number': 2}
                results.append(fields)
            
        elif type_ == 'pts':
            try:
                res = ocr(doc)
                res = split_rows(res)
                res = remove_spaces(res)
                res = res[res['text'].apply(lambda x: len(x) > 1)]
                data = get_vu_data(res)
                series_0, series_1, number = data.text.tolist()
                fields = {'type': 'vehicle_passport', 
                          'confidence': float(conf), 
                          'series': series_0 + series_1, 
                          'number': number, 
                          'page_number': 1}
                results.append(fields)
            except:
                fields = {'type': 'vehicle_passport', 
                          'confidence': float(conf), 
                          'series': 'none', 
                          'number': 'none', 
                          'page_number': 1}
                results.append(fields)
            
        elif type_ == 'sts_front':
            try:
                res = ocr(doc)
                res = split_rows(res)
                res = remove_spaces(res)
                res = res[res['text'].apply(lambda x: len(x) > 1)]
                data = get_vu_data(res)
                series_0, series_1, number = data.text.tolist()
                fields = {'type': 'vehicle_certificate', 
                          'confidence': float(conf), 
                          'series': series_0 + series_1, 
                          'number': number, 
                          'page_number': 1}
                results.append(fields)
            except:
                fields = {'type': 'vehicle_certificate', 
                          'confidence': float(conf), 
                          'series': 'none', 
                          'number': 'none', 
                          'page_number': 1}
                results.append(fields)

        elif type_ == 'sts_back':
            try:
                res = ocr(doc)
                res = split_rows(res)
                res = remove_spaces(res)
                res = res[res['text'].apply(lambda x: len(x) > 1)]
                data = get_vu_data(res)
                series_0, series_1, number = data.text.tolist()
                fields = {'type': 'vehicle_certificate', 
                          'confidence': float(conf), 
                          'series': series_0 + series_1, 
                          'number': number, 
                          'page_number': 2}
                results.append(fields)
            except:
                fields = {'type': 'vehicle_certificate', 
                          'confidence': float(conf), 
                          'series': 'none', 
                          'number': 'none', 
                          'page_number': 2}
                results.append(fields)
    return results


'''
пример:
path = '/kaggle/input/docs-gagrin/preparing_data/passport/train/passport.jpg'
img = cv2.imread(path)
result = work(path)
'''