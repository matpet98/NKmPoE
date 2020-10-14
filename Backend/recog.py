import speech_recognition as sr

# obtain path to "*.wav" in the same folder as this script
from os import path

def process_audio(filename):
    AUDIO_FILE = path.join(path.dirname(path.realpath(__file__)), filename)
    # use the audio file as the audio source
    r = sr.Recognizer()
    with sr.AudioFile(AUDIO_FILE) as source:
        audio = r.record(source)  # read the entire audio file

    # recognize speech using Sphinx
    try:
        result=r.recognize_sphinx(audio,language="de-DE")
        print("Sphinx thinks you said " + result)
        return result
    except sr.UnknownValueError:
        print("Sphinx could not understand audio")
        return None
    except sr.RequestError as e:
        print("Sphinx error; {0}".format(e))
        return None
