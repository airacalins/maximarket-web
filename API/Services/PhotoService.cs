using API.Data;
using API.Entities;

namespace API.Services
{
  public class PhotoService
  {
    private readonly PropertyManagementContext _context;
    private readonly PhotoAccessorService _photoAccessorService;
    public PhotoService(PropertyManagementContext context, PhotoAccessorService photoAccessorService)
    {
      _photoAccessorService = photoAccessorService;
      _context = context;

    }
    public async Task<string> UploadUserPhoto(IFormFile file, string userId)
    {
        var photoResult = await _photoAccessorService.AddPhoto(file);
        var photo = new Photo { Url = photoResult.Url, PublicId = photoResult.PublicId };
        _context.Photos.Add(photo);
        await _context.SaveChangesAsync();
        
        var user = await _context.Users.FindAsync(userId);
        if (user != null)
        {
            user.PhotoId = photo.Id;
            await _context.SaveChangesAsync();
        }

        return photo.Url;
    }

    public async Task<Photo> UploadPhoto(IFormFile file)
    {
        var photoResult = await _photoAccessorService.AddPhoto(file);
        var photo = new Photo { Url = photoResult.Url, PublicId = photoResult.PublicId };
        _context.Photos.Add(photo);
        await _context.SaveChangesAsync();
        return photo;
    }

    public async Task<Photo> UploadPhotoFromBase64(string base64String)
    {
        var photoResult = await _photoAccessorService.AddPhotoFromBase64(base64String);
        var photo = new Photo { Url = photoResult.Url, PublicId = photoResult.PublicId };
        _context.Photos.Add(photo);
        await _context.SaveChangesAsync();
        return photo;
    }
  }
}