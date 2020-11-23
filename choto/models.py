from django.db import models

# Create your models here.


class Url(models.Model):
    link = models.URLField()
    short_link = models.URLField(blank=True)

    def __str__(self):
        return "Link: %s" % self.link
