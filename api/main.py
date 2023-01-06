from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import torch
from torch import autocast
from diffusers import StableDiffusionPipeline
from io import BytesIO
import base64
device = torch.device("mps")
# device = "cpu"

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
model_id = "CompVis/stable-diffusion-v1-4"
# model = StableDiffusionPipeline.from_pretrained(model_id,torch_dtype=torch.float16, use_auth_token = auth_token)
model = StableDiffusionPipeline.from_pretrained(model_id,torch_dtype=torch.float16)
model.to(device)
@app.get("/")
def generate(prompt):
    image = model(prompt).images[0]
    image.save("image.png")
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    image_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")

    return Response(content=image_base64, media_type="image/png")

