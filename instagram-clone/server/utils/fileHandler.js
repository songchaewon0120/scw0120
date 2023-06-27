const multer = require("multer");
const path = require("path");

module.exports = function fileHandler(dest) {
  return multer({
    // storage : 파일 이름 생성, 파일 저장 경로 지정
    storage: multer.diskStorage({
      // multer.diskStorage 파일 저장경로 설정
      destination: (req, file, cb) => {
        cb(null, `${__dirname}/../files/${dest}/`);
      }, // files 파일이름? 아까 만든 files라는 폴더
      // __dirname : 현재 파일의 경로 | 현재 호출된 파일의 경로이다
      filename: (req, file, cb) => {
        // filename : 파일 이름을 생성
        // ext : (extension) 파일의 확장자 | .png .jpg 같은게 확장자임
        const ext = path.extname(file.originalname);
        
        cb(null, Date.now() + ext);
      },// 파일의 이름을 랜덤으로 생성 
    }),
    fileFilter: (req, file, cb) => {
        // fileFilter : 파일을 필터한다? | 확장자 extension
      const ext = path.extname(file.originalname);

      // 확장자를 검사
      if (ext === ".jpg" || ext === "jpeg" || ext === ".png") {
        return cb(null, true);
      }

      // 에러가 발생했을 때 (잘못된 확장자의 파일인 경우 에러처리)
      // 예를 들어 사진을 올려야하는데 엑셀파일을 올렸을 때
      const err = new TypeError("This type of file is not acceptable.");
      cb(err);
    },
    limits: {
        // 파일 제한 (limits)
      fileSize: 1e7, // 사이즈 제한(10PB 가지만 업로드 가능)
      // 갯수 제한 (10개까지만 업로드 가능)
      files: 10,
    },
  });
};
