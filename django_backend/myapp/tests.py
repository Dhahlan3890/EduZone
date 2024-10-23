from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from .models import User, Profile, Course

# Create your tests here.

class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')

    def test_user_creation(self):
        self.assertTrue(isinstance(self.user, User))
        self.assertEqual(self.user.username, 'testuser')

class CourseAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')
        self.client.force_authenticate(user=self.user)
        self.course = Course.objects.create(title='Test Course', description='Test Description', teacher=self.user)

    def test_get_courses(self):
        response = self.client.get(reverse('course-list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_create_course(self):
        data = {'title': 'New Course', 'description': 'New Description'}
        response = self.client.post(reverse('course-list'), data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Course.objects.count(), 2)
