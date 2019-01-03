using Facebook;
using Newtonsoft.Json.Linq;
using AirHelp.DAL;
using AirHelp.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Threading;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using System.Device.Location;
using AForge.Math;

namespace AirHelp.Controllers
{


    public class IndexController : BaseController
    {

        [Route("")]
        public ActionResult Index()
        {

            var json = Request.Form["data"];



            Complex c1 = new Complex(3, 9);
            Complex c2 = new Complex(8, 3);
            // sum
            Complex s1 = Complex.Add(c1, c2);
            Complex s2 = c1 + c2;
            Complex s3 = c1 + 5;
            // difference
            Complex d1 = Complex.Subtract(c1, c2);
            Complex d2 = c1 - c2;
            Complex d3 = c1 - 2;

            Complex[] data = new Complex[] {
                new Complex(3, 0),
                new Complex(5, 0),
                new Complex(-2, 0),
                new Complex(8, 0),
                new Complex(-1, 0),
                new Complex(2, 0)
        };

            FourierTransform.DFT(data, FourierTransform.Direction.Forward);

            FourierTransform.DFT(data, FourierTransform.Direction.Backward);


            return View("Index");

        }


        [Route("fft")]
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


            return Json(result, JsonRequestBehavior.AllowGet);

        }

        [Route("fft1")]
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


            return Json(result, JsonRequestBehavior.AllowGet);

        }

        public class Data{
            public Double Re { get; set; }
            public Double Im { get; set; }
        }

        [Route("fftC")]
        public ActionResult fftC(Data[] json)
        {

            Complex[] data = new Complex[json.Length];
           
            for (int i = 0; i < json.Length; i++)
            {
                var com = new Complex(json[i].Re, json[i].Im);
                data[i] = com;
            }

            

            FourierTransform.DFT(data, FourierTransform.Direction.Forward);

            return Json(data, JsonRequestBehavior.AllowGet);

        }

        [Route("fftC1")]
        public ActionResult fftC1(Data[] json)
        {

            Complex[] data = new Complex[json.Length];

            for (int i = 0; i < json.Length; i++)
            {
                var com = new Complex(json[i].Re, json[i].Im);
                data[i] = com;
            }



            FourierTransform.DFT(data, FourierTransform.Direction.Backward);

            return Json(data, JsonRequestBehavior.AllowGet);

        }


        [HttpGet]
        [Route("agenda")]
        public ActionResult Agenda()
        {
            return View("Agenda");
        }


        [HttpGet]
        [Route("foundament")]
        public ActionResult foundament()
        {
            return View("foundament");
        }

        [HttpGet]
        [Route("fftDemo")]
        public ActionResult fftDemo()
        {
            return View("fft");
        }

        [HttpGet]
        [Route("dft")]
        public ActionResult Dft()
        {
            return View("dft");
        }

        [HttpGet]
        [Route("dft1")]
        public ActionResult Dft1()
        {
            return View("dft1");
        }

        [HttpGet]
        [Route("dft2")]
        public ActionResult Dft2()
        {
            return View("dft2");
        }

        [HttpGet]
        [Route("eart")]
        public ActionResult eart()
        {
            return View("eart");
        }

        [HttpGet]
        [Route("eart1")]
        public ActionResult eart1()
        {
            return View("eart1");
        }

        [HttpGet]
        [Route("fourie")]
        public ActionResult fourie()
        {
            return View("fourie");
        }

        [HttpGet]
        [Route("18")]
        public ActionResult a18()
        {
            return View("18");
        }

        [HttpGet]
        [Route("fTransform")]
        public ActionResult fTransform()
        {
            return View("fTransform");
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

