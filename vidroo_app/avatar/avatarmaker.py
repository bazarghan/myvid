import os
import random


from PIL import Image, ImageDraw


def randomcolor():
    mylist = [(70, 166, 154), (80, 199, 219), (93, 110, 195),
              (122, 91, 197), (225, 62, 122), (228, 80, 77), (189, 189, 189), (123, 144, 157)]
    return random.choice(mylist)


def randommode():
    array = []

    for i in range(0, 11):
        arr = []
        if i == 0 or i == 10:
            for j in range(0, 11):
                arr.append(0)
            array.append(arr)
            continue
        arr.append(0)
        for j in range(0, 5):
            bit = random.randint(0, 1)
            arr.append(bit)
        for j in range(1, 5):
            arr.append(arr[5-j])
        arr.append(0)
        array.append(arr)

    return array


def chunkfiller(i, j, draw, chunksize, color):
    i *= chunksize
    j *= chunksize
    for x in range(i, i+chunksize):
        for y in range(j, j+chunksize):
            draw.point((x, y), fill=color)


def makeavatar(name):
    size = 220
    newimage = Image.new('RGB', (size, size), (255, 255, 255))
    draw = ImageDraw.Draw(newimage)
    color = randomcolor()
    chunk = 20
    array = randommode()

    for j in range(0, 11):
        for i in range(0, 11):
            if array[i][j]:
                chunkfiller(j, i, draw, chunk, color)

    fp = './media/images'
    fp = r'{}'.format(fp)
    name += ".jpg"
    newavatar = os.path.join(fp, name)
    if fp and not os.path.exists(fp):
        os.makedirs(fp)
    newimage.save(newavatar, 'jpeg')
