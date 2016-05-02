using System;
using DataVis.Providers;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Owin;

namespace DataVis
{
    public partial class Startup
    {
       

        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            // Enable the application to use a cookie to store information for the signed in user
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login")
            });
            // Use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Uncomment the following lines to enable logging in with third party login providers
            app.UseMicrosoftAccountAuthentication(
                clientId: "0000000044189525",
                clientSecret: "o4iVs0qr3b7-pEzFY4hcdOzMza7lchvy");

            app.UseTwitterAuthentication(
                consumerKey: "dKTJV7W0ehIsF9Aqg4kKBNQqi",
                consumerSecret: "2UJem1Ig1fVscsVUiM30jjwnoZHTzpf0Nd1c1WH3OIjL7fxZSz");

            app.UseVkontakteAuthentication("5445557", "9ktOlEbsK0PKDQERfbX0", "email,audio");

            app.UseFacebookAuthentication(
                appId: "1132958306748373",
                appSecret: "a669ee46cdc0d19705332d9dd43378a9");

            app.UseGoogleAuthentication(clientId: "637443079528-hdv21jbom72q19m6bkq0bjjma2c9lknn.apps.googleusercontent.com",
         clientSecret: "M78YLMp1T9ake8imJ7iZrPx5");
        }
    }
}
