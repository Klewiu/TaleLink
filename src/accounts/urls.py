from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from accounts import views
from rest_framework import routers


urlpatterns = [
    path('profile/', views.ProfileView.as_view(), name='user-profile'),
    path('api/auth/', views.CustomAuthToken.as_view(), name='user-authentication'),
    path('api/register/', views.UserRegistrationView.as_view(), name='user-registration'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
