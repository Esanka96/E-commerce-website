from rest_framework import serializers
from .models import User,Lasttable,carttable,Reviewtable,Totaltable

class TotaltableSerializer(serializers.ModelSerializer):
  class Meta:
    model=Totaltable
    fields="__all__"

class ReviewtableSerializer(serializers.ModelSerializer):
  class Meta:
    model=Reviewtable
    fields="__all__"

class CarttableSerializer(serializers.ModelSerializer):
  class Meta:
    model=carttable
    fields="__all__"

class lastTableSerializer(serializers.ModelSerializer):
  class Meta:
    model=Lasttable
    fields="__all__"

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model=User
    fields="__all__"
    extra_kwargs={
      'password':{'write_only':True}
    }

  def create(self,validated_data):
    password=validated_data.pop('password',None)
    instance=self.Meta.model(**validated_data)
    if password is not None:
       instance.set_password(password)
    instance.save()
    return instance
  



