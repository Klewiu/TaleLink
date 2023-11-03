from rest_framework import serializers
from .models import Story
from django.contrib.auth import get_user_model

class StorySerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        queryset=get_user_model().objects.all(),
        slug_field='username'
    )

    updatedBy = serializers.SlugRelatedField(
        queryset=get_user_model().objects.all(),
        slug_field='username'
    )    

    class Meta:
        model = Story
        fields = ["id", "title", "timestamp", "isEdit", "text", "category", "updated", "user", "updatedBy"]

