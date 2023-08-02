from django.contrib import admin
from .models.Profile import Profile
from .models.User import User
from .models.Userpreregister import Userpreregister
from .models.Room import Room
from .models.Chat import Chat
from .models.Roomuser import Roomuser
from .models.Chat import Chat
from .models.Help import Help
from .models.Join import JoinRoom

admin.site.register(Profile)
admin.site.register(User)
admin.site.register(Userpreregister)
admin.site.register(Room)
admin.site.register(Chat)
admin.site.register(Roomuser)
admin.site.register(Help)
admin.site.register(JoinRoom)
