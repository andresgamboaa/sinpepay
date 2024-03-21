
import type { APIRoute } from 'astro';


export const GET: APIRoute = async function GET() {
 try {
    const data = [{
        relation: ["delegate_permission/common.handle_all_urls"],
        target: {
            namespace: "android_app",
            package_name: "com.andresgamboaapps.app",
            sha256_cert_fingerprints: [
                "25:A5:8B:96:81:72:55:A5:30:2C:8E:4D:D6:AF:53:35:E5:E8:6E:5E:BF:83:F9:3D:D1:22:C4:81:EA:36:0B:9B"
            ]
        }
    }];

    return new Response(
        JSON.stringify(data),
        {
        headers: {
            'Content-Type': 'application/json',
        },
    });

 } catch (error) {
    throw new Error('Something went wrong in data.json route!');
 }
};
