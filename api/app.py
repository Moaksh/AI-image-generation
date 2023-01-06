import torch
from diffusers import StableDiffusionPipeline

model_id = "CompVis/stable-diffusion-v1-4"
device = torch.device("mps")

pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to(device)

prompt = "astronaut rides horse on mars"
image = pipe(prompt,guidance_scale=8.5).images[0]

image.save("astronaut_rides_horse.png")
