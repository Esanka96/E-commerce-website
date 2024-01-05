from django.urls import path
from .views import (RegisterView,LoginView,UserView,LogoutView,UpdateUserView,getUserView,LastTableView,getlasttableView,glasttableView,glasttablesingleView,cartcreateTableView,
                    TotalwView,TotalgettableView,TotaltablesingleView,carttableView,carttablesingleView,UpdatecarttotalView,ReviewgettableView,ReviewtablesingleView,
                    ReviewView, UpdatetotalView)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('totalcreate', TotalwView.as_view()),
    path('total', TotalgettableView.as_view()),
    path('total/<int:pk>/', TotaltablesingleView.as_view()),
    path('totalupdate/<int:pk>/', UpdatetotalView.as_view()),
    path('cartcreate', cartcreateTableView.as_view()),
    path('cart', carttableView.as_view()),
    path('cart/<int:pk>/', carttablesingleView.as_view()),
    path('deletecart/<int:pk>/', UpdatecarttotalView.as_view()),
    path('reviewcreate', ReviewView.as_view()),
    path('review', ReviewgettableView.as_view()),
    path('review/<int:pk>/', ReviewtablesingleView.as_view()),
    path('createlast', LastTableView.as_view()),
    path('last', glasttableView.as_view()),
    path('last/<int:pk>/', glasttablesingleView.as_view()),
    path('update/<int:pk>/', UpdateUserView.as_view()),
    path('address/<int:pk>/', getUserView.as_view()),
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user',UserView.as_view()),
    path('logout',LogoutView.as_view())
]

# urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)