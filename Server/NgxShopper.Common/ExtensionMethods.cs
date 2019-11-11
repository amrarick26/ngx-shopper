using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.AspNetCore.SpaServices.Prerendering;
using Microsoft.Extensions.DependencyInjection;
using NgxShopper.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NgxShopper.Common
{
    public static class ExtensionMethods
    {
        public static async Task<RenderToStringResult> PrerenderBuyer(this HttpRequest request) =>
            // Prerender / Serialize application (with Universal)
            await Prerenderer.RenderToString(
                "/",
                request.HttpContext.RequestServices.GetRequiredService<INodeServices>(),
                new System.Threading.CancellationTokenSource().Token,
                new JavaScriptModuleExport(request.HttpContext.RequestServices.GetRequiredService<IHostingEnvironment>().ContentRootPath + "/wwwroot/ngxbuyer/dist/boot.js"),
                $"{request.Scheme}://{request.Host}{request.HttpContext.Features.Get<IHttpRequestFeature>().RawTarget}",
                request.HttpContext.Features.Get<IHttpRequestFeature>().RawTarget,

                // We can pass any custom data down to the angular frontend which becomes available as window.TRANSFER_CACHE = {}
                // By default we're passing down Cookies, Headers, and Host from the Request object here
                new TransferData
                {
                    request = new
                    {
                        cookies = request.Cookies,
                        headers = request.Headers,
                        host = request.Host,
                        path = request.Path
                    },
                    thisCameFromDotNET = "Hi Angular Buyer it's asp.net :)"
                },
                30000,
                request.PathBase.ToString()
            );
    }
}
