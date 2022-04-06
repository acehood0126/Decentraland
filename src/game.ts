/// --- Set up a system ---

class RotatorSystem {
  // this group will contain every entity that has a Transform component
  group = engine.getComponentGroup(Transform)

  update(dt: number) {
    // iterate over the entities of the group
    for (const entity of this.group.entities) {
      // get the Transform component of the entity
      const transform = entity.getComponent(Transform)

      // mutate the rotation
      transform.rotate(Vector3.Up(), dt * 10)
    }
  }
}

// Add a new instance of the system to the engine
engine.addSystem(new RotatorSystem())

/// --- Spawner function ---

function spawnCube(x: number, y: number, z: number) {
  // create the entity
  const cube = new Entity()

  // add a transform to the entity
  cube.addComponent(new Transform({ position: new Vector3(x, y, z) }))

  // add a shape to the entity
  cube.addComponent(new BoxShape())

  // add the entity to the engine
  engine.addEntity(cube)

  return cube
}

/// --- Spawn a cube ---

const cube = spawnCube(8, 1, 8)

cube.addComponent(
  new OnPointerDown(() => {
    cube.getComponent(Transform).scale.z *= 1.1
    cube.getComponent(Transform).scale.x *= 0.9

    spawnCube(Math.random() * 8 + 1, Math.random() * 8, Math.random() * 8 + 1)
  })
)

// Create a avocado
let avocado = new Entity()
avocado.addComponent(new GLTFShape("models/Avocado/avocado.gltf"))
avocado.addComponent(
  new Transform({
    position: new Vector3(3, 1, 3),
    scale: new Vector3(10, 10, 10),
  })
)
engine.addEntity(avocado)

// Create an entity
const box = new Entity()

// Create and add a `Transform` component to that entity
box.addComponent(new Transform())

// Set the fields in the component
box.getComponent(Transform).position.set(3, 1, 3)

// Create and apply a `BoxShape` component to give the entity a visible form
box.addComponent(new BoxShape())
// Create component
box.addComponentOrReplace(new Material())
box.getComponent(Material).albedoColor = Color3.Red()

box.setParent(avocado)

// Add the entity to the engine
engine.addEntity(box)