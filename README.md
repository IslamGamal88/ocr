since the goal of the task is critical thinking, i will share with you my thought process and how i approached the problem, and it's also the reason why i didn't spent too much time on styling.

first i used tesseract library but i didn't like the results, so i thought of preprocessing the image, which led me down the rabbit hole of image processing and computer vision.

i used a few techniques to preprocess the image, i used greyscaling, thresholding, binarization and inversion, but that improved the results only a little bit, about 1% more accuracy.

however what i found really impacts the results is the quality of the image, the font and the size of the text and the most important thing is the background, the background should be as clean as possible, so in conclusion, the limitations of my solution are as follows:
- the image should be of high quality
- the text should be of a good size and font
- the background should be clean
- the text should be in the format of a list of inputs in a line like this: 
   ```
   Property: Value
   ```
i will attach a couple of sample cards that i used.

just import the image, and then click the `OCR` button, you will see the processed image and the relevant data extracted below inside of text inputs.

i hope you find my solution useful, and i'm looking forward to hearing from you.

thank you for your time.