const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const multer = require('multer');
// Cấu hình lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Đường dẫn thư mục lưu trữ file
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Khởi tạo multer với cấu hình lưu trữ và kiểm tra loại file
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'images' || file.fieldname === 'videoTour') {
      cb(null, true); // Chấp nhận file nếu đúng trường
    } else {
      cb(new multer.MulterError('Unexpected field'), false);
    }
  },
});
// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
const uri = 'mongodb://127.0.0.1:27017/luxury-apartment';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Define a schema and model

const EmployeeSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    avatar: {
      type: String,
      default: 'logo.png'
    },
    phone: String,
    salary: Number
  }
);
const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;

const LocationSchema = new mongoose.Schema({
  address: String,
  city: String,
  state: String,
  zipcode: String,
  country: String,
});

const FeaturesSchema = new mongoose.Schema({
  area: String,
  bedrooms: Number,
  bathrooms: Number,
  balconies: Number,
  floor: String,
  furnishing: String,
  parking: String,
});

const NearbyFacilitiesSchema = new mongoose.Schema({
  shoppingMalls: [String],
  schools: [String],
  hospitals: [String],
  publicTransport: [String],
});

const ApartmentSchema = new mongoose.Schema({
  name: String,
  location: LocationSchema,
  price: Number,
  description: String,
  features: FeaturesSchema,
  amenities: [String],
  images: [String],
  videoTour: String,
  nearbyFacilities: NearbyFacilitiesSchema,
  contactInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
});

const Apartment = mongoose.model('Apartment', ApartmentSchema);

module.exports = Apartment;
// UserSchema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'logo.png'
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
const BookingSchema = mongoose.Schema({
  apartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Apartment'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  time: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
})
const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
// Routes
app.get('/', async (req, res) => {
  try {
    const apartments = await Apartment.find();
    //res.json(apartments);
    res.json(apartments);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});
app.get('/product', async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.json(apartments);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/contact', async (req, res) => {
  try {
    const Employees = await Employee.find();
    res.json(Employees);
  }
  catch {
    res.status(400).json('Error: ' + err);
  }

});
app.get('/apartment/:id', async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id).populate('contactInfo');
    //console.log(apartment);
    res.json(apartment);
  }
  catch (err) {
    res.status(400).json('Error: ' + err);
  }
})
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }
  //console.log(email , password); //OK
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ success: false, message: 'Invalid email' });
    } else {
      if (password === user.password) {
        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
        res.json({ success: true, token });
      } else {
        return res.json({ success: false, message: 'Invalid password' });
      }
    }

  } catch (err) {
    console.log("Error :", err);
  }
  //console.log(user); //OK
  // console.log(typeof password);
  // console.log(typeof user.password);
  //So sánh mật khẩu nhập vào và mật khẩu được mã hóa lưu trong CSDL
  //( Tạm thời chưa dùng tới)
  // const isMatch = await bcrypt.compare(password, user.password);
  // console.log(isMatch);
  // if (!isMatch) {
  //   return res.status(400).json({ success: false, message: 'Invalid credentials' });
  // }


});
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  //console.log(name, email,password);  //TEST OK
  try {
    const checkEmail = await User.findOne({ email: email });
    if (!checkEmail) {
      const user = await User.create({
        name: name,
        email: email,
        password: password
      });
      user.save();
      res.json(user);
    } else {
      res.json({ result: 'false' })
    }

  } catch (err) {
    console.log("Error :", err);
  }
});
app.get('/search', async (req, res) => {
  let { keyword } = req.query;

  let query;

  // Nếu keyword là số, tìm kiếm trên các trường số
  if (!isNaN(keyword)) {
    keyword = Number(keyword);
    query = {
      $or: [
        { price: keyword },
        { 'features.area': keyword },
        { 'features.bedrooms': keyword },
        { 'features.bathrooms': keyword },
        { 'features.balconies': keyword },
      ]
    };
  } else {
    // Nếu keyword là chuỗi, tìm kiếm trên các trường chuỗi
    const regex = { $regex: keyword, $options: 'i' }; // Biến dùng để tránh lặp lại

    query = {
      $or: [
        { name: regex },
        { description: regex },
        { amenities: regex },
        { 'location.address': regex },
        { 'location.city': regex },
        { 'location.state': regex },
        { 'location.zipcode': regex },
        { 'location.country': regex },
        { 'features.floor': regex },
        { 'features.furnishing': regex },
        { 'features.parking': regex },
        { 'nearbyFacilities.shoppingMalls': regex },
        { 'nearbyFacilities.schools': regex },
        { 'nearbyFacilities.hospitals': regex },
        { 'nearbyFacilities.publicTransport': regex },
      ]
    };
  }

  try {
    const apartments = await Apartment.find(query);
    res.json(apartments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  // console.log(userId);
  try {
    const infoUser = await User.findById(userId);
    res.json(infoUser);
  } catch (err) {
    console.log(err);
  }
});
// Start the server
app.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }
  //console.log(email , password); //OK
  try {
    const admin = await Employee.findOne({ email: email, password :password ,role:'admin' });
    if(admin){
      const token = jwt.sign({adminId:admin._id},'secret', { expiresIn: '1h'});
      res.json({success:true ,token});
    }else{
      res.json({success:false,message:'This account does not exist !'});
    }

  } catch (err) {
    console.log("Error :", err);
  }
});
app.delete('/apartment/:id', async (req, res) => {
  let id = req.params;
  id = id.id;
  // console.log(id);
  // console.log(typeof(id));
  try {
    await Apartment.findByIdAndDelete(id);
    console.log('Delete sucessfully !');
    res.json({ result: 'ok' });
  } catch (err) {
    console.log("err", err);
    res.json({ result: 'error' });
  }
});
app.post('/add-apartment', upload.fields([
  { name: 'images', maxCount: 10 }, // Chấp nhận nhiều file ảnh
  { name: 'videoTour', maxCount: 1 } // Chỉ chấp nhận một file video
]), async (req, res) => {
  try {
    // Lấy dữ liệu từ req.body
    const name = req.body.name;
    const address = req.body['location.address'];
    const city = req.body['location.city'];
    const state = req.body['location.state'];
    const zipcode = req.body['location.zipcode'];
    const country = req.body['location.country'];
    const price = req.body.price;
    const description = req.body.description;
    const area = req.body['features.area'];
    const bedrooms = req.body['features.bedrooms'];
    const bathrooms = req.body['features.bathrooms'];
    const balconies = req.body['features.balconies'];
    const floor = req.body['features.floor'];
    const furnishing = req.body['features.furnishing'];
    const parking = req.body['features.parking'];
    const amenities = req.body.amenities.split(',').map(item => item.trim()); // Chuyển đổi chuỗi thành mảng
    const shoppingMalls = req.body['nearbyFacilities.shoppingMalls'].split(',').map(item => item.trim());
    const schools = req.body['nearbyFacilities.schools'].split(',').map(item => item.trim());
    const hospitals = req.body['nearbyFacilities.hospitals'].split(',').map(item => item.trim());
    const publicTransport = req.body['nearbyFacilities.publicTransport'].split(',').map(item => item.trim());
    const contactInfo = req.body.contactInfo;

    // Xử lý các tệp đã tải lên
    const imageUrls = req.files['images'] ? req.files['images'].map(file => `http://localhost:5000/uploads/${file.filename}`) : [];
    const videoUrl = req.files['videoTour'] ? `http://localhost:5000/uploads/${req.files['videoTour'][0].filename}` : null;

    // Tạo một căn hộ mới
    const newApartment = await Apartment.create({
      name,
      location: {
        address,
        city,
        state,
        zipcode,
        country
      },
      price,
      description,
      features: {
        area,
        bedrooms,
        bathrooms,
        balconies,
        floor,
        furnishing,
        parking
      },
      amenities,
      images: imageUrls,
      videoTour: videoUrl,
      nearbyFacilities: {
        shoppingMalls,
        schools,
        hospitals,
        publicTransport
      },
      contactInfo
    });

    res.json({
      success: true,
      apartment: newApartment
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to add apartment'
    });
  }
});
app.post('/edit-apartment', upload.fields([
  { name: 'images', maxCount: 10 }, // Chấp nhận nhiều file ảnh
  { name: 'videoTour', maxCount: 1 } // Chỉ chấp nhận một file video
]), async (req, res) => {
  try {
    // Lấy dữ liệu từ req.body
    const id = req.body.id;
    // console.log(id);
    const name = req.body.name;
    const address = req.body['location.address'];
    const city = req.body['location.city'];
    const state = req.body['location.state'];
    const zipcode = req.body['location.zipcode'];
    const country = req.body['location.country'];
    const price = req.body.price;
    const description = req.body.description;
    const area = req.body['features.area'];
    const bedrooms = req.body['features.bedrooms'];
    const bathrooms = req.body['features.bathrooms'];
    const balconies = req.body['features.balconies'];
    const floor = req.body['features.floor'];
    const furnishing = req.body['features.furnishing'];
    const parking = req.body['features.parking'];
    const amenities = req.body.amenities;
    const shoppingMalls = req.body['nearbyFacilities.shoppingMalls']
    const schools = req.body['nearbyFacilities.schools']
    const hospitals = req.body['nearbyFacilities.hospitals']
    const publicTransport = req.body['nearbyFacilities.publicTransport']
    const contactInfo = req.body.contactInfo;
    let imageUrls, videoUrl;
    // console.log(req.files.images? req.files.images.length :0 );
    if (req.files.images) {
      imageUrls = req.files['images'] ? req.files['images'].map(file => `http://localhost:5000/uploads/${file.filename}`) : [];
    } else {
      imageUrls = req.body.images.split(',').map(item => item.trim());
    }
    if (req.files.videoTour) {

      // Xử lý các tệp đã tải lên
      videoUrl = req.files['videoTour'] ? `http://localhost:5000/uploads/${req.files['videoTour'][0].filename}` : null;
    } else {
      videoUrl = req.body.videoTour;
    }
    console.log(imageUrls, videoUrl);
    // Tạo một căn hộ mới
    await Apartment.findByIdAndUpdate({ _id: id },
      {
        name,
        location: {
          address,
          city,
          state,
          zipcode,
          country
        },
        price,
        description,
        features: {
          area,
          bedrooms,
          bathrooms,
          balconies,
          floor,
          furnishing,
          parking
        },
        amenities,
        images: imageUrls,
        videoTour: videoUrl,
        nearbyFacilities: {
          shoppingMalls,
          schools,
          hospitals,
          publicTransport
        },
        contactInfo
      });

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to add apartment'
    });
  }
});
app.get('/admin/:adminId',async(req,res)=>{
  const adminId=req.params.adminId;
  // console.log(adminId);
  try {
    const admin=await Employee.findById(adminId);
    res.json(admin);
  }catch(err){
    console.error(err);
  }
})
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// API để tạo mới một lịch hẹn
app.post('/api/bookings', async (req, res) => {
  const { apartmentId, userId, time } = req.body;
  try {
    const newBooking = new Booking({
      apartment: apartmentId,
      user: userId,
      time: new Date(time),
      status: 'pending'
    });
    await newBooking.save();

    // Giả sử bạn muốn thông báo cho người dùng bằng email
    // Gửi email hoặc thông báo ở đây (giả sử có hàm sendNotification)
    sendNotification(userId, `Your booking for apartment ${apartmentId} is pending confirmation.`);

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking', error });
  }
});

// API để cập nhật trạng thái lịch hẹn
app.put('/api/bookings/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // status có thể là 'confirmed', 'cancelled'

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    // Gửi thông báo cho người dùng về việc cập nhật trạng thái
    sendNotification(booking.user, `Your booking has been ${status}.`);

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update booking status', error });
  }
});

function sendNotification(userId, message) {
  // Tùy vào hệ thống của bạn, bạn có thể sử dụng các dịch vụ như SendGrid, Twilio, hoặc một service custom
  console.log(`Notification sent to user ${userId}: ${message}`);
  // Gửi email hoặc thông báo push ở đây
}
