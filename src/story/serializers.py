from rest_framework import serializers
from .models import Story
from django.contrib.auth.models import User


class StorySerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username", read_only=True)

    class Meta: 
        model = Story
        fields = ["id","title","timestamp","isEdit","text","category","updated","user"]


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name','last_name','id','date_joined','last_login')