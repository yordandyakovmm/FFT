using System;
using System.Linq;
using Math.FFT;
using Microsoft.AspNetCore.Mvc;

namespace FFT.Controllers
{
    public class IndexController: Controller
    {

        [HttpGet("")]
        public ActionResult Index()
        {
            return View("Index");

        }


        [HttpPost("fft")]
        public ActionResult fft(string[] json)
        {

            Complex[] data = new Complex[json.Length];
            Complex[] time = new Complex[json.Length];
            for (int i = 0; i < json.Length; i++)
            {
                var com = this.ParceCom(json[i]);
                data[i] = com;
            }

            Array.Copy(data, time, data.Length);

            FourierTransform.DFT(data, FourierTransform.Direction.Forward);

            var result = new
            {
                time = time.Select(d => new { real = d.Re, imag = d.Im }).ToArray(),
                fft = data.Select(d => new { real = d.Re, imag = d.Im }).ToArray()
            };


            return Json(result);

        }

        [HttpPost("fft1")]
        public ActionResult fft1(string[] json)
        {

            Complex[] data = new Complex[json.Length];
            Complex[] fft = new Complex[json.Length];
            for (int i = 0; i < json.Length; i++)
            {
                var com = this.ParceCom(json[i]);
                data[i] = com;
            }

            Array.Copy(data, fft, data.Length);

            FourierTransform.DFT(data, FourierTransform.Direction.Backward);

            var result = new
            {
                time = data.Select(d => new { real = d.Re, imag = d.Im }).ToArray(),
                fft = fft.Select(d => new { real = d.Re, imag = d.Im }).ToArray()
            };


            return Json(result);

        }

        public class Data{
            public Double Re { get; set; }
            public Double Im { get; set; }
        }

        [HttpPost("fftC")]
        public ActionResult fftC(Data[] json)
        {

            Complex[] data = new Complex[json.Length];
           
            for (int i = 0; i < json.Length; i++)
            {
                var com = new Complex(json[i].Re, json[i].Im);
                data[i] = com;
            }

            

            FourierTransform.DFT(data, FourierTransform.Direction.Forward);

            var result = data.ToList().Select(s => new
            {
                Im = s.Im,
                Re = s.Re,
                Magnitude = s.Magnitude
            }).ToArray();


            return new OkObjectResult(result);

        }

        [HttpPost("fftC1")]
        public ActionResult fftC1(Data[] json)
        {

            Complex[] data = new Complex[json.Length];

            for (int i = 0; i < json.Length; i++)
            {
                var com = new Complex(json[i].Re, json[i].Im);
                data[i] = com;
            }

            FourierTransform.DFT(data, FourierTransform.Direction.Backward);

            var result = data.ToList().Select(s => new
            {
                Im = s.Im,
                Re = s.Re,
                Magnitude = s.Magnitude
            }).ToArray();

            return new OkObjectResult(result);

        }


        [HttpGet("agenda")]
        public ActionResult Agenda()
        {
            return View("Agenda");
        }


        [HttpGet("foundament")]
        public ActionResult foundament()
        {
            return View("foundament");
        }

        [HttpGet("fftDemo")]
        public ActionResult fftDemo()
        {
            return View("fft");
        }

        [HttpGet("dft")]
        public ActionResult Dft()
        {
            return View("dft");
        }

        [HttpGet("dft1")]
        public ActionResult Dft1()
        {
            return View("dft1");
        }

        [HttpGet("dft2")]
        public ActionResult Dft2()
        {
            return View("dft2");
        }

        [HttpGet("eart")]
        public ActionResult eart()
        {
            return View("eart");
        }

        [HttpGet("eart1")]
        public ActionResult eart1()
        {
            return View("eart1");
        }

        [HttpGet("fourie")]
        public ActionResult fourie()
        {
            return View("fourie");
        }

        [HttpGet("18")]
        public ActionResult a18()
        {
            return View("18");
        }

        [HttpGet("19")]
        public ActionResult a19()
        {
            return View("19");
        }

        [HttpGet("dmachine")]
        public ActionResult dmachine()
        {
            return View("dmachine");
        }


        [HttpGet("gaus")]
        public ActionResult gaus()
        {
            return View("gaus");
        }

        [HttpGet("fTransform")]
        public ActionResult fTransform()
        {
            return View("fTransform");
        }

        [HttpGet("dfunction")]
        public ActionResult dfunction()
        {
            return View("dfunction");
        }

        [HttpGet("dft-formula")]
        public ActionResult dftformula()
        {
            return View("dft-formula");
        }

        [HttpGet("fftd")]
        public ActionResult fftd()
        {
            return View("fftd");
        }

        [HttpGet("fft-formula")]
        public ActionResult fftformula()
        {
            return View("fft-formula");
        }

        [HttpGet("mp3")]
        public ActionResult mp3()
        {
            return View("mp3");
        }

        [HttpGet("logo")]
        public ActionResult logo()
        {
            return View("logo");
        }

        [HttpGet("convolution")]
        public ActionResult com()
        {
            return View("convolution");
        }


        [HttpGet("feature")]
        public ActionResult feature()
        {
            return View("feature");
        }

        [HttpGet("gps1")]
        public ActionResult gps1()
        {
            return View("gps1");
        }

        [HttpGet("gps2")]
        public ActionResult gps2()
        {
            return View("gps2");
        }

        [HttpGet("gps3")]
        public ActionResult gps3()
        {
            return View("gps3");
        }

        [HttpGet("identities")]
        public ActionResult identities(string category)
        {
            return View("identities");
        }

        [HttpGet("data")]
        public ActionResult data(string category)
        {
            return View("data");
        }

        [HttpGet("jpg")]
        public ActionResult jpg(string category)
        {
            return View("jpg");
        }

        [HttpGet("mony")]
        public ActionResult mony(string category)
        {
            return View("mony");
        }

        [HttpGet("sound-speed")]
        public ActionResult soundspeed(string category)
        {
            return View("sound-speed");
        }

        [HttpGet("qft")]
        public ActionResult qft(string category)
        {
            return View("qft");
        }
        private Complex ParceCom(string comlex)
        {

            double real = 0;
            double imag = 0;
            var com = comlex;
            com = com.Trim();
            var realSing = com[0] == '-' ? -1 : 1;
            com = com.TrimStart('-').TrimStart('+');

            if (com.IndexOf('-') == -1 && com.IndexOf('+') == -1)
            {
                real = 0;
                imag = double.Parse(com.TrimEnd('i')) * realSing;
            }

            if (com.Split('-').Length > 1)
            {
                real = double.Parse(com.Split('-')[0]) * realSing;
                imag = double.Parse(com.Split('-')[1].TrimEnd('i')) * (-1);
            }
            else if (com.Split('+').Length > 1)
            {
                real = double.Parse(com.Split('+')[0]) * realSing;
                imag = double.Parse(com.Split('+')[1].TrimEnd('i'));
            }
            else
            {
                real = double.Parse(com.Trim('i')) *  realSing;
                imag = 0;
            }

            return new Complex(real, imag);
        }



    }
}

