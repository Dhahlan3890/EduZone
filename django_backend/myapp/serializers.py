#serializers.py


from .models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Profile, Course, Enrollment, Profile_img
from .models import Notification, Course, CourseImage, Subtitle, SubtitleFile, SubtitleVideo

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class MyTOPS(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['bio'] = user.profile.bio
        token['role'] = user.profile.role
        token['institute'] = user.profile.institute

        return token
    

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    full_name = serializers.CharField(write_only=True, required=True)
    role = serializers.CharField(write_only=True, required=False)
    institute = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['full_name', 'email', 'username', 'password', 'password2', 'role', 'institute']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {'password':"Password Fields Didn't Match"}
            )
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])

        user.save()

        if "full_name" in validated_data:
            user.profile.full_name = validated_data['full_name']
            user.profile.save()

        if "role" in validated_data:
            user.profile.role = validated_data['role']
            user.profile.save()

        if "institute" in validated_data:
            user.profile.institute = validated_data['institute']
            user.profile.save()

        if "username" in validated_data:
            user.profile.profile_username = validated_data['username']
            user.profile.save()

        if "email" in validated_data:
            user.profile.profile_email = validated_data['email']
            user.profile.save()

        return user


class ProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile_img
        fields = '__all__'
    
class ProfileSerializer(serializers.ModelSerializer):
    profile_img = ProfileImageSerializer(required=False)
    class Meta:
        model = Profile
        fields = ['id', 'user', 'full_name', 'bio', 'verified', 'role', 'institute', 'profile_username', 'profile_email', 'profile_img']

# class CourseFileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CourseFile
#         fields = ['id', 'file']


class SubtitleFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubtitleFile
        fields = ['id', 'file']

class SubtitleVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubtitleVideo
        fields = ['id', 'video']

class SubtitleSerializer(serializers.ModelSerializer):
    files = SubtitleFileSerializer(many=True, read_only=True)
    videos = SubtitleVideoSerializer(many=True, read_only=True)

    class Meta:
        model = Subtitle
        fields = ['id', 'title', 'description', 'files', 'videos']

class CourseImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseImage
        fields = ['id', 'image']

# class CourseVideoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CourseVideo
#         fields = ['id', 'video']

class CourseSerializer(serializers.ModelSerializer):
    teacher_name = serializers.CharField(source='teacher.username', read_only=True)
    images = CourseImageSerializer(many=True, read_only=True)
    is_enrolled = serializers.SerializerMethodField()
    subtitles = SubtitleSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'created_at','teacher_name','is_enrolled', 'images', 'subtitles']

    def get_is_enrolled(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Enrollment.objects.filter(course=obj, student=request.user.profile).exists()
        return False


class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['id', 'course', 'student']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'message', 'created_at']


