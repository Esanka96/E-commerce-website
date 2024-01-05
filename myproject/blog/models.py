from django.db import models
from django.contrib.auth.models import AbstractUser

class carttable(models.Model):
  name=models.CharField(max_length=500)
  price=models.CharField(max_length=50)
  photo=models.CharField(max_length=500)
  iid=models.CharField(max_length=10)
  uid=models.CharField(max_length=10)

class Lasttable(models.Model):
  userid=models.CharField(max_length=20,null=True)
  name=models.CharField(max_length=500)
  price=models.CharField(max_length=100)
  count=models.CharField(max_length=20)
  total=models.CharField(max_length=50)
  orderid=models.CharField(max_length=50)
  esdate=models.CharField(max_length=100)
  ordate=models.CharField(max_length=100)
  photourl=models.CharField(max_length=750, null=True)
  itemid=models.CharField(max_length=10, null=True)

class User(AbstractUser):
  first_name=models.CharField(max_length=255)
  last_name=models.CharField(max_length=255)
  email=models.CharField(max_length=255,unique=True)
  password=models.CharField(max_length=255)
  name=models.CharField(max_length=255, null=True)
  telephone=models.CharField(max_length=20,null=True)
  address=models.CharField(max_length=255,null=True)
  district=models.CharField(max_length=50,null=True)
  province=models.CharField(max_length=50,null=True)
  country=models.CharField(max_length=50,null=True)
  postalcode=models.CharField(max_length=20,null=True)
  cardnumber=models.CharField(max_length=50,null=True)
  mm=models.CharField(max_length=10,null=True)
  yy=models.CharField(max_length=10,null=True)
  cvv=models.CharField(max_length=10,null=True)
  username=None

  USERNAME_FIELD='email'
  REQUIRED_FIELDS=[]

  def __stt__(self):
    return self.first_name

class Reviewtable(models.Model):
  rating=models.CharField(max_length=10)
  comments=models.CharField(max_length=1000)
  photo=models.ImageField(upload_to='',blank=True,null=True, max_length=200)
  odate=models.CharField(max_length=100)
  iname=models.CharField(max_length=50)
  iid=models.CharField(max_length=20)
  cfname=models.CharField(max_length=20)
  clname=models.CharField(max_length=20)

class Totaltable(models.Model):
  iname=models.CharField(max_length=50)
  name=models.CharField(max_length=500)
  price=models.CharField(max_length=100)
  photo=models.ImageField(upload_to='',blank=True,null=True, max_length=500)
  recount=models.CharField(max_length=50,blank=True,null=True,)
  avreview=models.CharField(max_length=50,blank=True,null=True,)







