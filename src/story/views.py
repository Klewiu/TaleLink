from django.shortcuts import render
from .models import Story
from rest_framework import viewsets
from story.serializers import StorySerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from story.serializers import CurrentUserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser

class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
    permission_classes = [AllowAny]

class CurrentUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = CurrentUserSerializer
    permission_classes = [AllowAny]