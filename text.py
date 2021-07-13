import json
import string 


def main():
    file = open("lyrics/st_georges.txt")

    line = file.read().replace("\n", " ")
    file.close()

    lyrics = line.translate(str.maketrans('', '', string.punctuation))

    lyrics = lyrics.lower()
    lyricList = lyrics.split()
    lyrics = " ".join(sorted(set(lyricList), key=lyricList.index))

    print(lyrics)



    with open('stgeorge_phrases.json', 'w') as filehandle:
        json.dump(lyricList, filehandle)

    with open('stgeorge_phrases.json', 'r') as filehandle:
        resultList = json.load(filehandle)        
        print(resultList)
     
if __name__ == '__main__':
    main()