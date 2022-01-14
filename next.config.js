module.exports = {
  images: {
      domains: [
        'res.cloudinary.com'
      ],
  },
  externals: {
    // only define the dependencies you are NOT using as externals!
    canvg: "canvg",
    html2canvas: "html2canvas",
    dompurify: "dompurify"
  },
  node :{
    fs: 'empty',
  }
}
