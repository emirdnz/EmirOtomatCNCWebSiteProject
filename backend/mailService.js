const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');
const dotenv = require('dotenv');
const https = require('https');
const fs = require('fs');

dotenv.config();

const app = express();

// CORS ayarları
app.use(cors({
  origin: [
    'https://emirotomatcnc.com',
    'https://www.emirotomatcnc.com',
    'https://emirotomatcnc.netlify.app',
    'http://localhost:3000'
  ],
  credentials: true
}));

// Body parser ayarları
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Multer ayarları
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 25 * 1024 * 1024,
    files: 5
  }
});

// Mail transporter - Hassas bilgileri .env'den al
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// İletişim bilgilerini environment variables'a taşı
const COMPANY_CONTACT = {
  address: process.env.COMPANY_ADDRESS,
  email: process.env.COMPANY_EMAIL,
  phone: process.env.COMPANY_PHONE
};

// Mail templates için dil desteği ekleyelim
const mailTemplates = {
  en: {
    company: {
      subject: 'New Online Order Request - Emir Otomat CNC',
      title: 'New Order Notification',
      customerInfo: 'Customer Information',
      orderDetails: 'Order Details',
      fileName: 'File Name',
      material: 'Material',
      quantity: 'Quantity',
      deliveryDate: 'Delivery Date',
      note: 'Note',
      notSpecified: 'Not specified'
    },
    customer: {
      subject: 'Your Order Has Been Received - Emir Otomat CNC',
      title: 'Your Order Has Been Successfully Received',
      greeting: 'Dear',
      message: 'Your order has been successfully received. Our team will review your order and contact you as soon as possible.',
      orderDetails: 'Order Details',
      contactInfo: 'Contact Information',
      address: 'Address',
      phone: 'Phone',
      email: 'Email'
    }
  },
  tr: {
    company: {
      subject: 'Yeni Online Sipariş Talebi - Emir Otomat CNC',
      title: 'Yeni Sipariş Bildirimi',
      customerInfo: 'Müşteri Bilgileri',
      orderDetails: 'Sipariş Detayları',
      fileName: 'Dosya Adı',
      material: 'Malzeme',
      quantity: 'Adet',
      deliveryDate: 'Teslimat Tarihi',
      note: 'Not',
      notSpecified: 'Belirtilmedi'
    },
    customer: {
      subject: 'Siparişiniz Alındı - Emir Otomat CNC',
      title: 'Siparişiniz Başarıyla Alındı',
      greeting: 'Sayın',
      message: 'Siparişiniz başarıyla alınmıştır. Ekibimiz en kısa sürede siparişinizi inceleyecek ve sizinle iletişime geçecektir.',
      orderDetails: 'Sipariş Detayları',
      contactInfo: 'İletişim Bilgilerimiz',
      address: 'Adres',
      phone: 'Tel',
      email: 'Email'
    }
  }
};

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Mail gönderme endpoint
app.post('/send-mail', upload.array('files', 5), async (req, res) => {
  try {
    console.log('Files received:', req.files); // Debug için

    const language = req.body.language || 'tr';
    const template = mailTemplates[language];
    
    const parsedCustomer = JSON.parse(req.body.customer);
    const parsedFiles = JSON.parse(req.body.fileDetails);

    // Dosya eklerini hazırla
    const attachments = req.files ? req.files.map(file => ({
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype
    })) : [];

    console.log('Attachments prepared:', attachments.length); // Debug için

    // Şirket maili için template
    const companyMailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <h2 style="color: #1a73e8;">${template.company.title}</h2>
        <div style="margin: 20px 0;">
          <h3>${template.company.customerInfo}</h3>
          <p><strong>Name:</strong> ${parsedCustomer.name}</p>
          <p><strong>Email:</strong> ${parsedCustomer.email}</p>
          <p><strong>Phone:</strong> ${parsedCustomer.phone}</p>
        </div>
        <div>
          <h3>${template.company.orderDetails}</h3>
          ${parsedFiles.map(file => `
            <div style="margin-bottom: 15px; padding: 10px; background: #f8f9fa;">
              <p><strong>${template.company.fileName}:</strong> ${file.name}</p>
              <p><strong>${template.company.material}:</strong> ${file.material}</p>
              <p><strong>${template.company.quantity}:</strong> ${file.quantity}</p>
              <p><strong>${template.company.deliveryDate}:</strong> ${file.deliveryDate}</p>
              <p><strong>${template.company.note}:</strong> ${file.note || template.company.notSpecified}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Müşteri maili için template
    const customerMailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <div style="background: #1a73e8; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #ffffff; margin: 0;">${template.customer.title}</h2>
        </div>
        
        <div style="background: #ffffff; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p style="font-size: 16px;">${template.customer.greeting} ${parsedCustomer.name},</p>
          <p style="font-size: 16px;">${template.customer.message}</p>

          <div style="margin: 30px 0;">
            <h3 style="color: #1a73e8;">${template.customer.orderDetails}</h3>
            ${parsedFiles.map(file => `
              <div style="background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 4px;">
                <p><strong>${template.company.fileName}:</strong> ${file.name}</p>
                <p><strong>${template.company.material}:</strong> ${file.material}</p>
                <p><strong>${template.company.quantity}:</strong> ${file.quantity}</p>
                <p><strong>${template.company.deliveryDate}:</strong> ${file.deliveryDate}</p>
                <p><strong>${template.company.note}:</strong> ${file.note || template.company.notSpecified}</p>
              </div>
            `).join('')}
          </div>

          <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 4px;">
            <h4 style="color: #1a73e8; margin-top: 0;">${template.customer.contactInfo}</h4>
            <p><strong>${template.customer.address}:</strong> ${COMPANY_CONTACT.address}</p>
            <p><strong>${template.customer.email}:</strong> ${COMPANY_CONTACT.email}</p>
            <p><strong>${template.customer.phone}:</strong> ${COMPANY_CONTACT.phone}</p>
          </div>
        </div>
      </div>
    `;

    // Alternatif müşteri maili için template
    const mailTemplate = `
      <h1>Siparişiniz Başarıyla Alındı</h1>
      
      <p>Sayın <b>${parsedCustomer.name}</b>,</p>
      
      <p>Siparişiniz başarıyla alınmıştır. Ekibimiz en kısa sürede siparişinizi inceleyecek ve sizinle iletişime geçecektir.</p>

      <h3>Sipariş Detayları</h3>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
        ${parsedFiles.map(file => `
          <p><strong>Dosya Adı:</strong> ${file.name}</p>
          <p><strong>Malzeme:</strong> ${file.material}</p>
          <p><strong>Adet:</strong> ${file.quantity}</p>
          <p><strong>Teslimat Tarihi:</strong> ${file.deliveryDate}</p>
          <p><strong>Not:</strong> ${file.note || template.company.notSpecified}</p>
        `).join('')}
      </div>

      <h3>İletişim Bilgilerimiz</h3>
    `;

    // Her iki maili paralel gönder
    await Promise.all([
      // Şirket maili
      transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: template.company.subject,
        html: companyMailTemplate,
        attachments: attachments
      }),

      // Müşteri maili
      transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: parsedCustomer.email,
        subject: template.customer.subject,
        html: customerMailTemplate,
        attachments: attachments
      })
    ]);

    console.log('Emails sent successfully with attachments'); // Debug için

    res.status(200).json({
      success: true,
      message: language === 'en' ? 'Order received successfully' : 'Sipariş başarıyla alındı'
    });

  } catch (error) {
    console.error('Mail sending error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// SSL configuration with proper error handling
try {
  const options = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    ca: fs.readFileSync(process.env.SSL_CHAIN_PATH),
    secureOptions: require('constants').SSL_OP_NO_TLSv1 | require('constants').SSL_OP_NO_TLSv1_1
  };

  const server = https.createServer(options, app);

  server.on('error', (error) => {
    console.error('HTTPS Server Error:', error);
  });

  server.listen(process.env.PORT, () => {
    console.log(`HTTPS Server running on port ${process.env.PORT}`);
  });

} catch (error) {
  console.error('SSL Configuration Error:', error);
  console.error('SSL Paths:', {
    key: process.env.SSL_KEY_PATH,
    cert: process.env.SSL_CERT_PATH,
    chain: process.env.SSL_CHAIN_PATH
  });
  process.exit(1);
}