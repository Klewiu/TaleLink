from rest_framework import serializers
from .models import Story


class StorySerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username", read_only=True)

    class Meta: 
        model = Story
        fields = ["id","title","timestamp","isEdit","text","category","updated","user"]