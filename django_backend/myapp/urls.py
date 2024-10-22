#urls.py

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MyTokenObtainPairView, RegisterView, protectedView, view_all_routes, ProfileDetailView,  EnrollmentListCreateView, ProfileListView, NotificationListCreateView, NotificationDetail

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet)

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/profile/', ProfileDetailView.as_view(), name='profile-detail'),
    path('api/test/', protectedView, name="test"),
    path('api/', include(router.urls)),
    path('api/enrollments/', EnrollmentListCreateView.as_view(), name='enrollment_list_create'),
    path('api/profiles/', ProfileListView.as_view(), name='profile_list'),
    path('api/notifications/', NotificationListCreateView.as_view(), name='notification_list_create'),
    path('notifications/<int:pk>/', NotificationDetail.as_view(), name='notification-detail'),
]
