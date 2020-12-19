from django.db import models
from django.contrib.auth.models import User


class Score(models.Model):
    score = models.IntegerField()
    owner = models.ForeignKey(
        User, related_name="scores", to_field="username", on_delete=models.CASCADE, null=True)
    created_at = models.DateField(auto_now_add=True)
