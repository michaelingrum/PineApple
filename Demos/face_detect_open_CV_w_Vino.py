import numpy as np
import cv2

cap = cv2.VideoCapture(0)


# Load the model
net = cv2.dnn.readNet("./models/intel/face-detection-adas-0001/FP16/face-detection-adas-0001.xml", "./models/intel/face-detection-adas-0001/FP16/face-detection-adas-0001.bin")

# Specify target device
net.setPreferableTarget(cv2.dnn.DNN_TARGET_MYRIAD)


while True:
    ret, frame = cap.read()

    blob = cv2.dnn.blobFromImage(frame, size=(672, 384), ddepth=cv2.CV_8U)
    net.setInput(blob)
    out = net.forward()

    # Draw detected faces on the frame
    for detection in out.reshape(-1, 7):
        confidence = float(detection[2])
        xmin = int(detection[3] * frame.shape[1])
        ymin = int(detection[4] * frame.shape[0])
        xmax = int(detection[5] * frame.shape[1])
        ymax = int(detection[6] * frame.shape[0])

        if confidence > 0.5:
            cv2.rectangle(frame, (xmin, ymin), (xmax, ymax), (255, 0, 0), 5)



    cv2.imshow('frame', frame)

    if cv2.waitKey(1) == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
