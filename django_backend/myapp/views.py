#views.py

from rest_framework.response import Response
from rest_framework import status
from .models import User
from django.conf import settings
from rest_framework.parsers import MultiPartParser, JSONParser

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
import logging

from .models import Profile
# from .serializers import ProfileSerializer
from rest_framework import generics
from .models import Profile, Profile_img
from .serializers import ProfileSerializer, ProfileImageSerializer
from .permissions import IsStudent, IsTeacher
from rest_framework import status, viewsets

logger = logging.getLogger(__name__)


from django.shortcuts import render
from .models import User
# Create your views here.

from .serializers import MyTOPS, RegistrationSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTOPS

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protectedView(request):
    output = f"Welcome {request.user}, Authentication Successful"
    return Response({'response':output}, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_all_routes(request):
    data = [
        'api/token/refresh/',
        'api/register/',
        'api/token/'
    ]

    return Response(data)


class ProfileDetailView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

    def perform_update(self, serializer):
    # Handle image uploads separately
        image_data = self.request.FILES.get('profile_img')
        if image_data:
            image_instance = Profile_img.objects.create(profile_img=image_data)
            serializer.save(profile_img=image_instance)
        else:
            serializer.save()

    def perform_create(self, serializer):
        image_data = self.request.data.get('profile_img', None)
        if image_data:
            image_serializer = ProfileImageSerializer(data={'profile_img': image_data})
            if image_serializer.is_valid():
                image_instance = image_serializer.save()
                serializer.save(user=self.request.user, image=image_instance)
            else:
                return Response(image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        image_instance = instance.profile_img
        self.perform_destroy(instance)
        if image_instance:
            image_instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class ProfileImageViewSet(viewsets.ModelViewSet):
    queryset = Profile_img.objects.all()
    serializer_class = ProfileImageSerializer
    permission_classes = [IsAuthenticated]


class ProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def put(self, request, *args, **kwargs):
        profile = self.request.user.profile
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=True, methods=['post'])
    def upload_files(self, request, pk=None):
        profile = self.get_object()
        
        Profile_imgs = request.FILES.getlist('profile_img')
        print(f'Received Images: {Profile_imgs}')
        for profile_img in Profile_imgs:
            Profile_img.objects.create(profile= profile, profile_img=profile_img)


        return Response({'status': 'profile img uploaded'}, status=status.HTTP_200_OK)
    
    def perform_create(self, serializer):
        profile = serializer.save()

        # Handle file upload manually

        profile_imgs = self.request.FILES.getlist('profile_img')

        print(f'Images: {profile_imgs}')
        
        for profile_img in profile_imgs:
            Profile_img.objects.create(profile=profile, profile_img=profile_img)


from rest_framework import generics, permissions
from .models import Course, Enrollment, SubtitleVideo, SubtitleFile, Subtitle
from .serializers import CourseSerializer, EnrollmentSerializer, SubtitleFileSerializer, SubtitleSerializer, SubtitleVideoSerializer

class EnrollmentListCreateView(generics.ListCreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(student=self.request.user.profile)


class NotificationListCreateView(generics.ListCreateAPIView):
    queryset = Notification.objects.all().order_by('-created_at')
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]


class NotificationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


from rest_framework import viewsets
from .models import Course, CourseImage
from .serializers import CourseSerializer, CourseImageSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def upload_files(self, request, pk=None):
        course = self.get_object()
        files = request.FILES.getlist('files')
        images = request.FILES.getlist('images')
        videos = request.FILES.getlist('videos')


        print(f'Received Files: {files}')
        print(f'Received Images: {images}')
        print(f'Received Videos: {videos}')

        for file in files:
            SubtitleFile.objects.create(course=course, file=file)
        for image in images:
            CourseImage.objects.create(course=course, image=image)
        for video in videos:
            SubtitleVideo.objects.create(course=course, video=video)

        return Response({'status': 'files uploaded'}, status=status.HTTP_200_OK)
    
    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise serializer.ValidationError("User must be logged in to create a course.")
        course = serializer.save(teacher=self.request.user)
        
        images = self.request.FILES.getlist('images')

        print(f'Images: {images}')
        
        for image in images:
            CourseImage.objects.create(course=course, image=image)

        i = 0
        while f'subtitles[{i}][title]' in self.request.data:
            subtitle_title = self.request.data.get(f'subtitles[{i}][title]')
            subtitle_description = self.request.data.get(f'subtitles[{i}][description]')
            subtitle = Subtitle.objects.create(course=course, title=subtitle_title, description=subtitle_description)

            # Handling Subtitle Files
            files = self.request.FILES.getlist(f'subtitles[{i}][files]')
            print(f'Files in subtitle {i}: {files}')
            for file in files:
                SubtitleFile.objects.create(subtitle=subtitle, file=file)

            # Handling Subtitle Videos
            videos = self.request.FILES.getlist(f'subtitles[{i}][videos]')
            print(f'Videos in subtitle {i}: {videos}')
            for video in videos:
                SubtitleVideo.objects.create(subtitle=subtitle, video=video)

            i += 1


    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def enroll(self, request, pk=None):
        course = self.get_object()
        student = request.user.profile

        # Check if the student is already enrolled in the course
        if Enrollment.objects.filter(course=course, student=student).exists():
            return Response({"detail": "You are already enrolled in this course."}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new enrollment
        Enrollment.objects.create(course=course, student=student)
        return Response({"detail": "Successfully enrolled in the course."}, status=status.HTTP_201_CREATED)
