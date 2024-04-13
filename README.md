# Gagarin_Hack 

*Misis status.md team*

Team Members:
1) Анна Гулякина - Design
2) Кирилл Рыжичкин - ML Engineer
3) Дмитрий Коноплянников - Frontend
4) Егор Чистов - Backend
5) Груздев Александр - ML Engineer

## Задача трека "Меркурий"

> Разработать сервис, позволяющий в режиме работы по api с определенной вероятностью классифицировать фото-сканы автомобильных документов по их типам - определить вероятности соответствия конкретному типу (водительское удостоверение, свидетельство о регистрации транспортного средства, птс, паспорт РФ), а также номер листа/стороны документа, и получить основную информацию/атрибутику из каждого документа.

## Предложенное решение

В результате работы над поставленной задачей были обучены модели YoloV8m, YoloV8s для распознавания типа документа и его границ. Наша модель способна работать с фотографиями, на которых расположено несколько документов (определяет их все), на которых документ искажен, плохо виден текст. Дополнительно была обучена YoloV8s для определения местоположения серии и номера на документе, которая поможет в дальнейшем ускорить и упростить процесс распознавания текста. Также изначальна была обучена ResNet15 для классификации документов (более лёгкая модель для детекции типа документа и его стороны, не использовалась в итоговом решении). 

Протестировать сервис можно по ссылке: [statusmd.itatmisis.ru](http://statusmd.itatmisis.ru/)

Принцип работы системы изображен на блок-схеме:

![alt text](scheme.png)


**Компьютерное зрение:** 
1) Для определения границ документа и классификации его типа и страницы используется модель YoloV8m. При необходимости можно использовать более легковесные модели данной архитектуры. Экспериментально было обнаружено, что это не критически сказывается на качестве работы модели. Пайплайн обучения можно найти в [YOLO_training_pipeline.ipynb](https://github.com/l1ghtsource/gagarin-hack-document-reader/blob/main/ml/Yolo_training_pipeline.ipynb)
2) Для оптического распознавания символов применяется EasyOсr. По результатам тестов и изучения статей данное решение показало наилучшее соотношение качества распознавания и времени работы. Подробнее о работе алгоритма оптического распознавания в [gagarin-final.ipynb](https://github.com/l1ghtsource/gagarin-hack-document-reader/blob/main/ml/gagarin-final.ipynb)


**Серверная часть: (Напишите тут как-то правильным языком)**
1) API 
2) FRONTEND 
3) BACKEND 

Может сюда пример работы программы в гифке запиздячить, я хз 


## Запуск решения для теста

Для запуска решения можно воспользоваться: ХХХ

Или: ХХХ 


## Перспективы развития, возможные "узкие места" и методы их решения 

В репозитории проекта представлены следующие невошедшие в финальный продукт наработки, которые, потенциально, могут быть использованы в случае необходимости: 

1) Multilabel_Classification.ipynb - Легковесная модель, не использующая архитектуру YOLO и, потенциально, требующая меньше времени и вычислительных ресурсов. Может быть использована если необходимо получить решение, работающее на телефоне
2) Yolo_Serial_Number_Detector.pt - Модель YoloV8s обученная находить в документе расположение серийного номера и серии. Может быть использована при увеличении размеров датасета для ускорения работы алгоритма оптического распознования
