from django.shortcuts import render
from .models import Story

# Create your views here.
from rest_framework import viewsets
from rest_framework import permissions
from story.serializers import StorySerializer

class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
    permission_classes = [permissions.IsAuthenticated]
