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




class productoffer(APIView):
    def patch(self,request):
        productname=request.data["productname"]
        discountper = request.data["discountpercentage"]
        offername = request.data["offername"]
        productid=Product.objects.get(productname=productname)
        if productid.offerstatus==True:
            return Response ("product offer already applied  ")
        print(productid,"productid ")
        discountpercentage=int(discountper)
        actualprice=productid.price
        price2=productid.price2
        price2=actualprice
        print(price2)
        discountprice=actualprice*discountpercentage/100
        print(discountprice)
        actualprice=price2-discountprice

        print(actualprice)
        productid.price=actualprice
        productid.price2=price2
        productid.offerstatus=True
        productid.offer_name=offername
        productid.offerpercentage = discountpercentage
        
        print(productid.price, productid.price2,
              productid.offerstatus, productid.offer_name)
        productid.save()
        
        return Response("offer applied to product")
    def get(self,request):
      
        product = Product.objects.filter(offerstatus=True)
        Serializer = MyproductSerializer(
            product, many=True, context={'request': request})
        print(Serializer.data)

        return Response(Serializer.data)

    def post(self,request):
        pk=request.data["id"]
        product=Product.objects.get(id=pk)
        print(product)
        productprice2= product.price2
        print(productprice2)
        productprice=product.price
        print(productprice)
        product.price = productprice2

        product.offerstatus=False
        product.save()
        return Response("offer cancled")
        
class Categoryoffer(APIView):
    pass



#    {"productname":"addidas","discountpercentage":"10","offername":"onamoffer"}