from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from validate_email import validate_email


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        if(len(validated_data['password']) > 7):
            user = User.objects.create_user(
                validated_data['username'],
                validated_data['email'],
                validated_data['password'])
            return user

        else:
            raise serializers.ValidationError(
                "Password Must be at least 8 characters long")


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        username = ""

        if validate_email(email):
            user_request = get_object_or_404(
                User,
                email=email,
            )

            username = user_request.username

        else:
            raise serializers.ValidationError("Invalid Email Address")

        user = authenticate(username=username, password=password)

        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
