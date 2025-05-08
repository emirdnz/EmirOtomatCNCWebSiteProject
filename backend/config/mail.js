const mailConfig = {
  maxFileSize: 25 * 1024 * 1024, // 25MB
  allowedFileTypes: [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'application/dxf',
    'application/x-dxf',
    'application/dwg',
    'application/x-dwg',
    'application/sldprt',
    'application/sldasm',
    'application/slddrw'
  ],
  rateLimiting: {
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 5 // Her IP için maksimum istek sayısı
  }
};

module.exports = mailConfig;