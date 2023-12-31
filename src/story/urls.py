from rest_framework import routers
from story import views
from django.urls import include, path
from story.views import StoryCategoryViewSet


router = routers.DefaultRouter()
router.register(r'story', views.StoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('story-categories/', StoryCategoryViewSet.as_view(), name='story-categories'),
]