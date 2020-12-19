from .models import Score
from rest_framework import viewsets, permissions
from .serializers import ScoreSerializer


# Score Viewset


class ScoreView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    serializer_class = ScoreSerializer

    # queryset = Score.objects.all().raw(
    #     '''SELECT * FROM leaderboard_score ORDER BY score DESC FETCH FIRST 100 ROW ONLY''')

    queryset = Score.objects.all().order_by('-score')[:100]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
