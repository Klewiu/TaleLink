from django.shortcuts import render
from .models import Story
from rest_framework import viewsets, views
from story.serializers import StorySerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
    permission_classes = [AllowAny]


class StoryCategoryViewSet(views.APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        return Response([choice[0] for choice in Story.STORY_CATEGORY_CHOICES])