from dataclasses import dataclass
from re import S
from urllib import request
from django.shortcuts import render
from django.urls import is_valid_path

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404, JsonResponse
from .models import Product
from .serilazer import MyproductSerializer
from rest_framework import status


class productlist(APIView):
    def get(self, request):
        print("product list")
        product = Product.objects.all()
        Serializer = MyproductSerializer(
            product, many=True, context={'request': request})
        print(Serializer.data)

        return Response(Serializer.data)


class showproduct(APIView):
    serializer_class = MyproductSerializer
    def get(self,request,pk):
        data=Product.objects.get(pk=pk)
        seril = self.serializer_class(data, context={'request': request})
        serialized_data = seril.data
        print(serialized_data)
        return Response(serialized_data)
        # return Response({'msg':'request received herer'})



# class showproduct (APIView):

#     serializer_class=MyproductSerializer
#     def get_object(self,pk):
#         try:
#             obj=Product.objects.get(pk=pk)
#             return obj
#         except Product.DoesNotExist:

#             return Http404

#     def get(self,request,pk,format=None):
#         serializer=self.serializer_class(self.get_object(pk))
#         serialized_data=serializer.data
#         return Response(serialized_data,status=status.HTTP_200_OK)
