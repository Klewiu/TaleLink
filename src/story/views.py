from django.shortcuts import render
from .models import Story
from rest_framework import viewsets
from story.serializers import StorySerializer
from rest_framework.permissions import AllowAny

class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
    permission_classes = [AllowAny]
