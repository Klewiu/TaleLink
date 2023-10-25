from django.shortcuts import render
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from .serializers import UserRegistrationSerializer
from rest_framework.permissions import AllowAny 
from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view, permission_classes


# class ProfileView(APIView):
#     authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
#     permission_classes = [IsAuthenticated]

#     def get(self, request, format=None):
#         content = {
#             'user': str(request.user.email),  # `django.contrib.auth.User` instance.
#             'auth': str(request.auth),  # None
#         }
#         return Response(content)

class ProfileView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        content = {
            'username': user.username,
            'user_id': user.pk,
            'email': user.email,
        }
        return Response(content)    



class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        print(f"User: {user}")
        print(f"Token: {token.key}")
        return Response({
            'token': token.key,
            'username': user.username,
            'firstname': user.first_name,
            'user_id': user.pk,
            'email': user.email
        })

class UserRegistrationView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny] 
    
    def perform_create(self, serializer):
        password = make_password(serializer.validated_data['password'])
        serializer.save(password=password)


@api_view(['GET'])
@permission_classes([AllowAny])
def check_username_availability(request, username):
    exists = User.objects.filter(username=username).exists()
    return Response({'exists': exists})

@api_view(['GET'])
@permission_classes([AllowAny])
def check_email_availability(request, email):
    exists = User.objects.filter(email=email).exists()
    return Response({'exists': exists})