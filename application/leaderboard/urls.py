from rest_framework import routers
from .api import ScoreView

router = routers.DefaultRouter()
router.register('api/scores', ScoreView, 'score')

urlpatterns = router.urls
