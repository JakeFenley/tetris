from rest_framework import serializers
from .models import Score


class ScoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Score
        fields = ('id', 'score', 'created_at', 'owner_id')
