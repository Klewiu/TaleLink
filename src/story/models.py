from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Story(models.Model):

    STORY_CATEGORY_CHOICES = (
        ('Poem','Poem'),
        ('Fantasy','Fantasy'),
        ('Thriller','Thriller')
    )

    title = models.CharField(max_length = 180)
    timestamp = models.DateTimeField(auto_now_add = True, auto_now = False, blank = True)
    isEdit = models.BooleanField(default = False, blank = True)
    text = models.TextField()
    category = models.CharField(max_length=30, choices=STORY_CATEGORY_CHOICES)
    updated = models.DateTimeField(auto_now = True, blank = True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='stories_created', blank=True, null=True)
    updatedBy = models.CharField(max_length=255, null=True, blank=True, default=None)

    def __str__(self):
        return self.title