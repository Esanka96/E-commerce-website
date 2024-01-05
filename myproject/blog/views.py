from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework.exceptions import AuthenticationFailed
from .serializers import (UserSerializer,lastTableSerializer,CarttableSerializer,ReviewtableSerializer,TotaltableSerializer)
from .models import User,Lasttable,carttable,Reviewtable,Totaltable
import jwt,datetime
from rest_framework import generics,status

class RegisterView(APIView):
  def post(self, request):
    serializer=UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
  
class LastTableView(APIView):
   def post(self, request):
      serializer=lastTableSerializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      serializer.save()
      return Response(serializer.data)
  
class LoginView(APIView):
  def post(self, request):
    email=request.data['email']
    password=request.data['password']

    user=User.objects.filter(email=email).first()

    if user is None:
      raise AuthenticationFailed('User not found!')
    
    if not user.check_password(password):
      raise AuthenticationFailed('Incorrect password!')
    
    return Response({
      'message':'success'
    })
  
class LoginView(APIView):
  def post(self, request):
    email=request.data['email']
    password=request.data['password']

    user=User.objects.filter(email=email).first()

    if user is None:
      raise AuthenticationFailed('User not found!')
    
    if not user.check_password(password):
      raise AuthenticationFailed('Incorrect password!')
    
    payload={
      'id':user.id,
      'exp':datetime.datetime.utcnow()+datetime.timedelta(hours=24),
      'iat':datetime.datetime.utcnow()
    }

    token=jwt.encode(payload,'secret',algorithm='HS256')

    response=Response()

    response.set_cookie(key='jwt',value=token,httponly=True)

    response.data={
      'jwt':token
    }
    
    return response
  
class UserView(APIView):

  def get(self,request):
    token=request.COOKIES.get('jwt')

    if not token:
      raise AuthenticationFailed('Unauthenticated!')
    
    try:
      payload=jwt.decode(token,'secret',algorithms=['HS256'])
    
    except jwt.ExpiredSignatureError:
      raise AuthenticationFailed('Unauthenticated!')
    
    user=User.objects.filter(id=payload['id']).first()
    serializer=UserSerializer(user)
    return Response(serializer.data)
  
class LogoutView(APIView):
  def post(self,request):
    response=Response()
    response.delete_cookie('jwt')
    response.data={
      'message':'success'
    }
    return response

class UpdateUserView(APIView):

    def post(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(serializer.data)
    
class getUserView(APIView):
   def get(self, request,pk):
      try:
         user=User.objects.get(pk=pk)
      except User.DoesNotExist:
         return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
      serializer=UserSerializer(user)
      return Response(serializer.data)
      
class getlasttableView(APIView):
   def get(self, request,pk):
      try:
         lasttable=Lasttable.objects.get(pk=pk)
      except Lasttable.DoesNotExist:
         return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
      serializer=lastTableSerializer(lasttable)
      return Response(serializer.data)
   
class glasttableView(generics.ListAPIView):
   serializer_class=lastTableSerializer
   queryset=Lasttable.objects.all()

   def list(self, request, *args, **kwargs):
      queryset = self.get_queryset()
      serializer = self.get_serializer(queryset, many=True)
      return Response(serializer.data)
   
class glasttablesingleView(generics.RetrieveAPIView):
    serializer_class = lastTableSerializer
    queryset = Lasttable.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    def get_object(self):
      try:
          post_id = self.kwargs['pk']
          return Lasttable.objects.get(id=post_id)
      except Lasttable.DoesNotExist:
          return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
      
class cartcreateTableView(APIView):
   def post(self, request):
      serializer=CarttableSerializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      serializer.save()
      return Response(serializer.data)
   
class carttableView(generics.ListAPIView):
   serializer_class=CarttableSerializer
   queryset=carttable.objects.all()

   def list(self, request, *args, **kwargs):
      queryset = self.get_queryset()
      serializer = self.get_serializer(queryset, many=True)
      return Response(serializer.data)
   
class carttablesingleView(generics.RetrieveAPIView):
    serializer_class = CarttableSerializer
    queryset = carttable.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    def get_object(self):
      try:
          post_id = self.kwargs['pk']
          return carttable.objects.get(id=post_id)
      except carttable.DoesNotExist:
          return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
      
class UpdatecarttotalView(APIView):
    def post(self, request, pk):
        try:
            Total = carttable.objects.get(pk=pk)
        except Totaltable.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        Total.delete()
        return Response(200)
      
class ReviewView(APIView):
  def post(self, request):
    serializer=ReviewtableSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
  
class ReviewgettableView(generics.ListAPIView):
   serializer_class=ReviewtableSerializer
   queryset=Reviewtable.objects.all()

   def list(self, request, *args, **kwargs):
      queryset = self.get_queryset()
      serializer = self.get_serializer(queryset, many=True)
      return Response(serializer.data)
   
class ReviewtablesingleView(generics.RetrieveAPIView):
    serializer_class = ReviewtableSerializer
    queryset = Reviewtable.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    def get_object(self):
      try:
          post_id = self.kwargs['pk']
          return Reviewtable.objects.get(id=post_id)
      except Reviewtable.DoesNotExist:
          return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
      
class TotalwView(APIView):
  def post(self, request):
    serializer=TotaltableSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
  
class TotalgettableView(generics.ListAPIView):
   serializer_class=TotaltableSerializer
   queryset=Totaltable.objects.all()

   def list(self, request, *args, **kwargs):
      queryset = self.get_queryset()
      serializer = self.get_serializer(queryset, many=True)
      return Response(serializer.data)
   
class TotaltablesingleView(generics.RetrieveAPIView):
    serializer_class = TotaltableSerializer
    queryset = Totaltable.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    def get_object(self):
      try:
          post_id = self.kwargs['pk']
          return Totaltable.objects.get(id=post_id)
      except Totaltable.DoesNotExist:
          return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
      
class UpdatetotalView(APIView):

    def post(self, request, pk):
        try:
            Total = Totaltable.objects.get(pk=pk)
        except Totaltable.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = TotaltableSerializer(Total, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(serializer.data)