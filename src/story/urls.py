from rest_framework import routers
from story import views
from django.urls import include, path

router = routers.DefaultRouter()
router.register(r'story', views.StoryViewSet)
router.register(r'user', views.CurrentUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]