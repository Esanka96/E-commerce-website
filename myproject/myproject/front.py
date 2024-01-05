import requests
from bs4 import BeautifulSoup
import json
import os
import django
import re

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

django.setup()
from blog.models import Totaltable

def sanitize_title(title):
    invalid_chars = r'[\/:*?"<>|]'
    title = re.sub(invalid_chars, '_', title)[:120]
    return title

url='https://www.daraz.lk/catalog/?q=UPS&_keyori=ss&from=input&spm=a2a0e.searchlist.search.go.67c231e9aEj6IY'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

item_name='UPS'

response= requests.get(url,headers=headers)
soup=BeautifulSoup(response.text,'html.parser')

div_ele=soup.find_all('script')[3]
if div_ele:
    text = div_ele.text
    index = text.find("window.pageData=")
    if index != -1:
        cleaned_text = text[index + len("window.pageData="):]
        data = json.loads(cleaned_text)
        page_props=data.get('mods',{}).get('listItems',[])

        name_list=[]
        price_list=[]
        photo_list=[]
        for i,single in enumerate(page_props):
            name=single.get('name',{})
            price='Rs. '+single.get('utLogMap', {}).get('current_price',{})
            if price[-3:]!='.00':
                price = 'Rs. ' + single.get('utLogMap', {}).get('current_price', {})+'.00'
            photo=single.get('image',{})
            name_list,created=Totaltable.objects.get_or_create(iname=item_name,name=name,price=price)
            name=sanitize_title(name)
            photos=requests.get(photo)
            out_path = "C:/Users/SMTC PVT LTD/Desktop/New folder/myproject/static/images"
            image_path = os.path.join(out_path, f'{name}.webp')
            name_list.photo=image_path
            name_list.save()

            with open(image_path,'wb') as f:
                f.write(photos.content)
            print(price)





