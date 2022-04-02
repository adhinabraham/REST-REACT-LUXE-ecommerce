from django.urls import path
from . import views


urlpatterns = [
   
    path('productlist/',views.productlist.as_view()),
    path('showproduct/<int:pk>',views.showproduct.as_view()),
]
