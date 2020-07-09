"use strict";
// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/
exports.__esModule = true;
exports.typeDefs = "type AggregateDiagrama {\n  count: Int!\n}\n\ntype AggregateDiagramaUsuario {\n  count: Int!\n}\n\ntype AggregateSala {\n  count: Int!\n}\n\ntype AggregateUsuario {\n  count: Int!\n}\n\ntype AggregateUsuarioSala {\n  count: Int!\n}\n\ntype BatchPayload {\n  count: Long!\n}\n\nscalar DateTime\n\ntype Diagrama {\n  id: ID!\n  createdAt: DateTime!\n  updatedAt: DateTime!\n  datos: String!\n  diagramasPorUsuario(where: DiagramaUsuarioWhereInput, orderBy: DiagramaUsuarioOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DiagramaUsuario!]\n}\n\ntype DiagramaConnection {\n  pageInfo: PageInfo!\n  edges: [DiagramaEdge]!\n  aggregate: AggregateDiagrama!\n}\n\ninput DiagramaCreateInput {\n  id: ID\n  datos: String!\n  diagramasPorUsuario: DiagramaUsuarioCreateManyWithoutDiagramaInput\n}\n\ninput DiagramaCreateOneWithoutDiagramasPorUsuarioInput {\n  create: DiagramaCreateWithoutDiagramasPorUsuarioInput\n  connect: DiagramaWhereUniqueInput\n}\n\ninput DiagramaCreateWithoutDiagramasPorUsuarioInput {\n  id: ID\n  datos: String!\n}\n\ntype DiagramaEdge {\n  node: Diagrama!\n  cursor: String!\n}\n\nenum DiagramaOrderByInput {\n  id_ASC\n  id_DESC\n  createdAt_ASC\n  createdAt_DESC\n  updatedAt_ASC\n  updatedAt_DESC\n  datos_ASC\n  datos_DESC\n}\n\ntype DiagramaPreviousValues {\n  id: ID!\n  createdAt: DateTime!\n  updatedAt: DateTime!\n  datos: String!\n}\n\ntype DiagramaSubscriptionPayload {\n  mutation: MutationType!\n  node: Diagrama\n  updatedFields: [String!]\n  previousValues: DiagramaPreviousValues\n}\n\ninput DiagramaSubscriptionWhereInput {\n  mutation_in: [MutationType!]\n  updatedFields_contains: String\n  updatedFields_contains_every: [String!]\n  updatedFields_contains_some: [String!]\n  node: DiagramaWhereInput\n  AND: [DiagramaSubscriptionWhereInput!]\n  OR: [DiagramaSubscriptionWhereInput!]\n  NOT: [DiagramaSubscriptionWhereInput!]\n}\n\ninput DiagramaUpdateInput {\n  datos: String\n  diagramasPorUsuario: DiagramaUsuarioUpdateManyWithoutDiagramaInput\n}\n\ninput DiagramaUpdateManyMutationInput {\n  datos: String\n}\n\ninput DiagramaUpdateOneRequiredWithoutDiagramasPorUsuarioInput {\n  create: DiagramaCreateWithoutDiagramasPorUsuarioInput\n  update: DiagramaUpdateWithoutDiagramasPorUsuarioDataInput\n  upsert: DiagramaUpsertWithoutDiagramasPorUsuarioInput\n  connect: DiagramaWhereUniqueInput\n}\n\ninput DiagramaUpdateWithoutDiagramasPorUsuarioDataInput {\n  datos: String\n}\n\ninput DiagramaUpsertWithoutDiagramasPorUsuarioInput {\n  update: DiagramaUpdateWithoutDiagramasPorUsuarioDataInput!\n  create: DiagramaCreateWithoutDiagramasPorUsuarioInput!\n}\n\ntype DiagramaUsuario {\n  id: ID!\n  createdAt: DateTime!\n  updatedAt: DateTime!\n  diagrama: Diagrama!\n  sala: Sala!\n  usuario: Usuario!\n}\n\ntype DiagramaUsuarioConnection {\n  pageInfo: PageInfo!\n  edges: [DiagramaUsuarioEdge]!\n  aggregate: AggregateDiagramaUsuario!\n}\n\ninput DiagramaUsuarioCreateInput {\n  id: ID\n  diagrama: DiagramaCreateOneWithoutDiagramasPorUsuarioInput!\n  sala: SalaCreateOneWithoutDiagramasPorUsuarioInput!\n  usuario: UsuarioCreateOneWithoutDiagramasPorUsuarioInput!\n}\n\ninput DiagramaUsuarioCreateManyWithoutDiagramaInput {\n  create: [DiagramaUsuarioCreateWithoutDiagramaInput!]\n  connect: [DiagramaUsuarioWhereUniqueInput!]\n}\n\ninput DiagramaUsuarioCreateManyWithoutSalaInput {\n  create: [DiagramaUsuarioCreateWithoutSalaInput!]\n  connect: [DiagramaUsuarioWhereUniqueInput!]\n}\n\ninput DiagramaUsuarioCreateManyWithoutUsuarioInput {\n  create: [DiagramaUsuarioCreateWithoutUsuarioInput!]\n  connect: [DiagramaUsuarioWhereUniqueInput!]\n}\n\ninput DiagramaUsuarioCreateWithoutDiagramaInput {\n  id: ID\n  sala: SalaCreateOneWithoutDiagramasPorUsuarioInput!\n  usuario: UsuarioCreateOneWithoutDiagramasPorUsuarioInput!\n}\n\ninput DiagramaUsuarioCreateWithoutSalaInput {\n  id: ID\n  diagrama: DiagramaCreateOneWithoutDiagramasPorUsuarioInput!\n  usuario: UsuarioCreateOneWithoutDiagramasPorUsuarioInput!\n}\n\ninput DiagramaUsuarioCreateWithoutUsuarioInput {\n  id: ID\n  diagrama: DiagramaCreateOneWithoutDiagramasPorUsuarioInput!\n  sala: SalaCreateOneWithoutDiagramasPorUsuarioInput!\n}\n\ntype DiagramaUsuarioEdge {\n  node: DiagramaUsuario!\n  cursor: String!\n}\n\nenum DiagramaUsuarioOrderByInput {\n  id_ASC\n  id_DESC\n  createdAt_ASC\n  createdAt_DESC\n  updatedAt_ASC\n  updatedAt_DESC\n}\n\ntype DiagramaUsuarioPreviousValues {\n  id: ID!\n  createdAt: DateTime!\n  updatedAt: DateTime!\n}\n\ninput DiagramaUsuarioScalarWhereInput {\n  id: ID\n  id_not: ID\n  id_in: [ID!]\n  id_not_in: [ID!]\n  id_lt: ID\n  id_lte: ID\n  id_gt: ID\n  id_gte: ID\n  id_contains: ID\n  id_not_contains: ID\n  id_starts_with: ID\n  id_not_starts_with: ID\n  id_ends_with: ID\n  id_not_ends_with: ID\n  createdAt: DateTime\n  createdAt_not: DateTime\n  createdAt_in: [DateTime!]\n  createdAt_not_in: [DateTime!]\n  createdAt_lt: DateTime\n  createdAt_lte: DateTime\n  createdAt_gt: DateTime\n  createdAt_gte: DateTime\n  updatedAt: DateTime\n  updatedAt_not: DateTime\n  updatedAt_in: [DateTime!]\n  updatedAt_not_in: [DateTime!]\n  updatedAt_lt: DateTime\n  updatedAt_lte: DateTime\n  updatedAt_gt: DateTime\n  updatedAt_gte: DateTime\n  AND: [DiagramaUsuarioScalarWhereInput!]\n  OR: [DiagramaUsuarioScalarWhereInput!]\n  NOT: [DiagramaUsuarioScalarWhereInput!]\n}\n\ntype DiagramaUsuarioSubscriptionPayload {\n  mutation: MutationType!\n  node: DiagramaUsuario\n  updatedFields: [String!]\n  previousValues: DiagramaUsuarioPreviousValues\n}\n\ninput DiagramaUsuarioSubscriptionWhereInput {\n  mutation_in: [MutationType!]\n  updatedFields_contains: String\n  updatedFields_contains_every: [String!]\n  updatedFields_contains_some: [String!]\n  node: DiagramaUsuarioWhereInput\n  AND: [DiagramaUsuarioSubscriptionWhereInput!]\n  OR: [DiagramaUsuarioSubscriptionWhereInput!]\n  NOT: [DiagramaUsuarioSubscriptionWhereInput!]\n}\n\ninput DiagramaUsuarioUpdateInput {\n  diagrama: DiagramaUpdateOneRequiredWithoutDiagramasPorUsuarioInput\n  sala: SalaUpdateOneRequiredWithoutDiagramasPorUsuarioInput\n  usuario: UsuarioUpdateOneRequiredWithoutDiagramasPorUsuarioInput\n}\n\ninput DiagramaUsuarioUpdateManyWithoutDiagramaInput {\n  create: [DiagramaUsuarioCreateWithoutDiagramaInput!]\n  delete: [DiagramaUsuarioWhereUniqueInput!]\n  connect: [DiagramaUsuarioWhereUniqueInput!]\n  set: [DiagramaUsuarioWhereUniqueInput!]\n  disconnect: [DiagramaUsuarioWhereUniqueInput!]\n  update: [DiagramaUsuarioUpdateWithWhereUniqueWithoutDiagramaInput!]\n  upsert: [DiagramaUsuarioUpsertWithWhereUniqueWithoutDiagramaInput!]\n  deleteMany: [DiagramaUsuarioScalarWhereInput!]\n}\n\ninput DiagramaUsuarioUpdateManyWithoutSalaInput {\n  create: [DiagramaUsuarioCreateWithoutSalaInput!]\n  delete: [DiagramaUsuarioWhereUniqueInput!]\n  connect: [DiagramaUsuarioWhereUniqueInput!]\n  set: [DiagramaUsuarioWhereUniqueInput!]\n  disconnect: [DiagramaUsuarioWhereUniqueInput!]\n  update: [DiagramaUsuarioUpdateWithWhereUniqueWithoutSalaInput!]\n  upsert: [DiagramaUsuarioUpsertWithWhereUniqueWithoutSalaInput!]\n  deleteMany: [DiagramaUsuarioScalarWhereInput!]\n}\n\ninput DiagramaUsuarioUpdateManyWithoutUsuarioInput {\n  create: [DiagramaUsuarioCreateWithoutUsuarioInput!]\n  delete: [DiagramaUsuarioWhereUniqueInput!]\n  connect: [DiagramaUsuarioWhereUniqueInput!]\n  set: [DiagramaUsuarioWhereUniqueInput!]\n  disconnect: [DiagramaUsuarioWhereUniqueInput!]\n  update: [DiagramaUsuarioUpdateWithWhereUniqueWithoutUsuarioInput!]\n  upsert: [DiagramaUsuarioUpsertWithWhereUniqueWithoutUsuarioInput!]\n  deleteMany: [DiagramaUsuarioScalarWhereInput!]\n}\n\ninput DiagramaUsuarioUpdateWithoutDiagramaDataInput {\n  sala: SalaUpdateOneRequiredWithoutDiagramasPorUsuarioInput\n  usuario: UsuarioUpdateOneRequiredWithoutDiagramasPorUsuarioInput\n}\n\ninput DiagramaUsuarioUpdateWithoutSalaDataInput {\n  diagrama: DiagramaUpdateOneRequiredWithoutDiagramasPorUsuarioInput\n  usuario: UsuarioUpdateOneRequiredWithoutDiagramasPorUsuarioInput\n}\n\ninput DiagramaUsuarioUpdateWithoutUsuarioDataInput {\n  diagrama: DiagramaUpdateOneRequiredWithoutDiagramasPorUsuarioInput\n  sala: SalaUpdateOneRequiredWithoutDiagramasPorUsuarioInput\n}\n\ninput DiagramaUsuarioUpdateWithWhereUniqueWithoutDiagramaInput {\n  where: DiagramaUsuarioWhereUniqueInput!\n  data: DiagramaUsuarioUpdateWithoutDiagramaDataInput!\n}\n\ninput DiagramaUsuarioUpdateWithWhereUniqueWithoutSalaInput {\n  where: DiagramaUsuarioWhereUniqueInput!\n  data: DiagramaUsuarioUpdateWithoutSalaDataInput!\n}\n\ninput DiagramaUsuarioUpdateWithWhereUniqueWithoutUsuarioInput {\n  where: DiagramaUsuarioWhereUniqueInput!\n  data: DiagramaUsuarioUpdateWithoutUsuarioDataInput!\n}\n\ninput DiagramaUsuarioUpsertWithWhereUniqueWithoutDiagramaInput {\n  where: DiagramaUsuarioWhereUniqueInput!\n  update: DiagramaUsuarioUpdateWithoutDiagramaDataInput!\n  create: DiagramaUsuarioCreateWithoutDiagramaInput!\n}\n\ninput DiagramaUsuarioUpsertWithWhereUniqueWithoutSalaInput {\n  where: DiagramaUsuarioWhereUniqueInput!\n  update: DiagramaUsuarioUpdateWithoutSalaDataInput!\n  create: DiagramaUsuarioCreateWithoutSalaInput!\n}\n\ninput DiagramaUsuarioUpsertWithWhereUniqueWithoutUsuarioInput {\n  where: DiagramaUsuarioWhereUniqueInput!\n  update: DiagramaUsuarioUpdateWithoutUsuarioDataInput!\n  create: DiagramaUsuarioCreateWithoutUsuarioInput!\n}\n\ninput DiagramaUsuarioWhereInput {\n  id: ID\n  id_not: ID\n  id_in: [ID!]\n  id_not_in: [ID!]\n  id_lt: ID\n  id_lte: ID\n  id_gt: ID\n  id_gte: ID\n  id_contains: ID\n  id_not_contains: ID\n  id_starts_with: ID\n  id_not_starts_with: ID\n  id_ends_with: ID\n  id_not_ends_with: ID\n  createdAt: DateTime\n  createdAt_not: DateTime\n  createdAt_in: [DateTime!]\n  createdAt_not_in: [DateTime!]\n  createdAt_lt: DateTime\n  createdAt_lte: DateTime\n  createdAt_gt: DateTime\n  createdAt_gte: DateTime\n  updatedAt: DateTime\n  updatedAt_not: DateTime\n  updatedAt_in: [DateTime!]\n  updatedAt_not_in: [DateTime!]\n  updatedAt_lt: DateTime\n  updatedAt_lte: DateTime\n  updatedAt_gt: DateTime\n  updatedAt_gte: DateTime\n  diagrama: DiagramaWhereInput\n  sala: SalaWhereInput\n  usuario: UsuarioWhereInput\n  AND: [DiagramaUsuarioWhereInput!]\n  OR: [DiagramaUsuarioWhereInput!]\n  NOT: [DiagramaUsuarioWhereInput!]\n}\n\ninput DiagramaUsuarioWhereUniqueInput {\n  id: ID\n}\n\ninput DiagramaWhereInput {\n  id: ID\n  id_not: ID\n  id_in: [ID!]\n  id_not_in: [ID!]\n  id_lt: ID\n  id_lte: ID\n  id_gt: ID\n  id_gte: ID\n  id_contains: ID\n  id_not_contains: ID\n  id_starts_with: ID\n  id_not_starts_with: ID\n  id_ends_with: ID\n  id_not_ends_with: ID\n  createdAt: DateTime\n  createdAt_not: DateTime\n  createdAt_in: [DateTime!]\n  createdAt_not_in: [DateTime!]\n  createdAt_lt: DateTime\n  createdAt_lte: DateTime\n  createdAt_gt: DateTime\n  createdAt_gte: DateTime\n  updatedAt: DateTime\n  updatedAt_not: DateTime\n  updatedAt_in: [DateTime!]\n  updatedAt_not_in: [DateTime!]\n  updatedAt_lt: DateTime\n  updatedAt_lte: DateTime\n  updatedAt_gt: DateTime\n  updatedAt_gte: DateTime\n  datos: String\n  datos_not: String\n  datos_in: [String!]\n  datos_not_in: [String!]\n  datos_lt: String\n  datos_lte: String\n  datos_gt: String\n  datos_gte: String\n  datos_contains: String\n  datos_not_contains: String\n  datos_starts_with: String\n  datos_not_starts_with: String\n  datos_ends_with: String\n  datos_not_ends_with: String\n  diagramasPorUsuario_every: DiagramaUsuarioWhereInput\n  diagramasPorUsuario_some: DiagramaUsuarioWhereInput\n  diagramasPorUsuario_none: DiagramaUsuarioWhereInput\n  AND: [DiagramaWhereInput!]\n  OR: [DiagramaWhereInput!]\n  NOT: [DiagramaWhereInput!]\n}\n\ninput DiagramaWhereUniqueInput {\n  id: ID\n}\n\nscalar Long\n\ntype Mutation {\n  createDiagrama(data: DiagramaCreateInput!): Diagrama!\n  updateDiagrama(data: DiagramaUpdateInput!, where: DiagramaWhereUniqueInput!): Diagrama\n  updateManyDiagramas(data: DiagramaUpdateManyMutationInput!, where: DiagramaWhereInput): BatchPayload!\n  upsertDiagrama(where: DiagramaWhereUniqueInput!, create: DiagramaCreateInput!, update: DiagramaUpdateInput!): Diagrama!\n  deleteDiagrama(where: DiagramaWhereUniqueInput!): Diagrama\n  deleteManyDiagramas(where: DiagramaWhereInput): BatchPayload!\n  createDiagramaUsuario(data: DiagramaUsuarioCreateInput!): DiagramaUsuario!\n  updateDiagramaUsuario(data: DiagramaUsuarioUpdateInput!, where: DiagramaUsuarioWhereUniqueInput!): DiagramaUsuario\n  upsertDiagramaUsuario(where: DiagramaUsuarioWhereUniqueInput!, create: DiagramaUsuarioCreateInput!, update: DiagramaUsuarioUpdateInput!): DiagramaUsuario!\n  deleteDiagramaUsuario(where: DiagramaUsuarioWhereUniqueInput!): DiagramaUsuario\n  deleteManyDiagramaUsuarios(where: DiagramaUsuarioWhereInput): BatchPayload!\n  createSala(data: SalaCreateInput!): Sala!\n  updateSala(data: SalaUpdateInput!, where: SalaWhereUniqueInput!): Sala\n  updateManySalas(data: SalaUpdateManyMutationInput!, where: SalaWhereInput): BatchPayload!\n  upsertSala(where: SalaWhereUniqueInput!, create: SalaCreateInput!, update: SalaUpdateInput!): Sala!\n  deleteSala(where: SalaWhereUniqueInput!): Sala\n  deleteManySalas(where: SalaWhereInput): BatchPayload!\n  createUsuario(data: UsuarioCreateInput!): Usuario!\n  updateUsuario(data: UsuarioUpdateInput!, where: UsuarioWhereUniqueInput!): Usuario\n  updateManyUsuarios(data: UsuarioUpdateManyMutationInput!, where: UsuarioWhereInput): BatchPayload!\n  upsertUsuario(where: UsuarioWhereUniqueInput!, create: UsuarioCreateInput!, update: UsuarioUpdateInput!): Usuario!\n  deleteUsuario(where: UsuarioWhereUniqueInput!): Usuario\n  deleteManyUsuarios(where: UsuarioWhereInput): BatchPayload!\n  createUsuarioSala(data: UsuarioSalaCreateInput!): UsuarioSala!\n  updateUsuarioSala(data: UsuarioSalaUpdateInput!, where: UsuarioSalaWhereUniqueInput!): UsuarioSala\n  updateManyUsuarioSalas(data: UsuarioSalaUpdateManyMutationInput!, where: UsuarioSalaWhereInput): BatchPayload!\n  upsertUsuarioSala(where: UsuarioSalaWhereUniqueInput!, create: UsuarioSalaCreateInput!, update: UsuarioSalaUpdateInput!): UsuarioSala!\n  deleteUsuarioSala(where: UsuarioSalaWhereUniqueInput!): UsuarioSala\n  deleteManyUsuarioSalas(where: UsuarioSalaWhereInput): BatchPayload!\n}\n\nenum MutationType {\n  CREATED\n  UPDATED\n  DELETED\n}\n\ninterface Node {\n  id: ID!\n}\n\ntype PageInfo {\n  hasNextPage: Boolean!\n  hasPreviousPage: Boolean!\n  startCursor: String\n  endCursor: String\n}\n\ntype Query {\n  diagrama(where: DiagramaWhereUniqueInput!): Diagrama\n  diagramas(where: DiagramaWhereInput, orderBy: DiagramaOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Diagrama]!\n  diagramasConnection(where: DiagramaWhereInput, orderBy: DiagramaOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DiagramaConnection!\n  diagramaUsuario(where: DiagramaUsuarioWhereUniqueInput!): DiagramaUsuario\n  diagramaUsuarios(where: DiagramaUsuarioWhereInput, orderBy: DiagramaUsuarioOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DiagramaUsuario]!\n  diagramaUsuariosConnection(where: DiagramaUsuarioWhereInput, orderBy: DiagramaUsuarioOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DiagramaUsuarioConnection!\n  sala(where: SalaWhereUniqueInput!): Sala\n  salas(where: SalaWhereInput, orderBy: SalaOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Sala]!\n  salasConnection(where: SalaWhereInput, orderBy: SalaOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SalaConnection!\n  usuario(where: UsuarioWhereUniqueInput!): Usuario\n  usuarios(where: UsuarioWhereInput, orderBy: UsuarioOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Usuario]!\n  usuariosConnection(where: UsuarioWhereInput, orderBy: UsuarioOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UsuarioConnection!\n  usuarioSala(where: UsuarioSalaWhereUniqueInput!): UsuarioSala\n  usuarioSalas(where: UsuarioSalaWhereInput, orderBy: UsuarioSalaOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UsuarioSala]!\n  usuarioSalasConnection(where: UsuarioSalaWhereInput, orderBy: UsuarioSalaOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UsuarioSalaConnection!\n  node(id: ID!): Node\n}\n\ntype Sala {\n  id: ID!\n  createdAt: DateTime!\n  updatedAt: DateTime!\n  nombre: String!\n  usuariosEnSala(where: UsuarioSalaWhereInput, orderBy: UsuarioSalaOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UsuarioSala!]\n  diagramasPorUsuario(where: DiagramaUsuarioWhereInput, orderBy: DiagramaUsuarioOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DiagramaUsuario!]\n}\n\ntype SalaConnection {\n  pageInfo: PageInfo!\n  edges: [SalaEdge]!\n  aggregate: AggregateSala!\n}\n\ninput SalaCreateInput {\n  id: ID\n  nombre: String!\n  usuariosEnSala: UsuarioSalaCreateManyWithoutSalaInput\n  diagramasPorUsuario: DiagramaUsuarioCreateManyWithoutSalaInput\n}\n\ninput SalaCreateOneWithoutDiagramasPorUsuarioInput {\n  create: SalaCreateWithoutDiagramasPorUsuarioInput\n  connect: SalaWhereUniqueInput\n}\n\ninput SalaCreateOneWithoutUsuariosEnSalaInput {\n  create: SalaCreateWithoutUsuariosEnSalaInput\n  connect: SalaWhereUniqueInput\n}\n\ninput SalaCreateWithoutDiagramasPorUsuarioInput {\n  id: ID\n  nombre: String!\n  usuariosEnSala: UsuarioSalaCreateManyWithoutSalaInput\n}\n\ninput SalaCreateWithoutUsuariosEnSalaInput {\n  id: ID\n  nombre: String!\n  diagramasPorUsuario: DiagramaUsuarioCreateManyWithoutSalaInput\n}\n\ntype SalaEdge {\n  node: Sala!\n  cursor: String!\n}\n\nenum SalaOrderByInput {\n  id_ASC\n  id_DESC\n  createdAt_ASC\n  createdAt_DESC\n  updatedAt_ASC\n  updatedAt_DESC\n  nombre_ASC\n  nombre_DESC\n}\n\ntype SalaPreviousValues {\n  id: ID!\n  createdAt: DateTime!\n  updatedAt: DateTime!\n  nombre: String!\n}\n\ntype SalaSubscriptionPayload {\n  mutation: MutationType!\n  node: Sala\n  updatedFields: [String!]\n  previousValues: SalaPreviousValues\n}\n\ninput SalaSubscriptionWhereInput {\n  mutation_in: [MutationType!]\n  updatedFields_contains: String\n  updatedFields_contains_every: [String!]\n  updatedFields_contains_some: [String!]\n  node: SalaWhereInput\n  AND: [SalaSubscriptionWhereInput!]\n  OR: [SalaSubscriptionWhereInput!]\n  NOT: [SalaSubscriptionWhereInput!]\n}\n\ninput SalaUpdateInput {\n  nombre: String\n  usuariosEnSala: UsuarioSalaUpdateManyWithoutSalaInput\n  diagramasPorUsuario: DiagramaUsuarioUpdateManyWithoutSalaInput\n}\n\ninput SalaUpdateManyMutationInput {\n  nombre: String\n}\n\ninput SalaUpdateOneRequiredWithoutDiagramasPorUsuarioInput {\n  create: SalaCreateWithoutDiagramasPorUsuarioInput\n  update: SalaUpdateWithoutDiagramasPorUsuarioDataInput\n  upsert: SalaUpsertWithoutDiagramasPorUsuarioInput\n  connect: SalaWhereUniqueInput\n}\n\ninput SalaUpdateOneRequiredWithoutUsuariosEnSalaInput {\n  create: SalaCreateWithoutUsuariosEnSalaInput\n  update: SalaUpdateWithoutUsuariosEnSalaDataInput\n  upsert: SalaUpsertWithoutUsuariosEnSalaInput\n  connect: SalaWhereUniqueInput\n}\n\ninput SalaUpdateWithoutDiagramasPorUsuarioDataInput {\n  nombre: String\n  usuariosEnSala: UsuarioSalaUpdateManyWithoutSalaInput\n}\n\ninput SalaUpdateWithoutUsuariosEnSalaDataInput {\n  nombre: String\n  diagramasPorUsuario: DiagramaUsuarioUpdateManyWithoutSalaInput\n}\n\ninput SalaUpsertWithoutDiagramasPorUsuarioInput {\n  update: SalaUpdateWithoutDiagramasPorUsuarioDataInput!\n  create: SalaCreateWithoutDiagramasPorUsuarioInput!\n}\n\ninput SalaUpsertWithoutUsuariosEnSalaInput {\n  update: SalaUpdateWithoutUsuariosEnSalaDataInput!\n  create: SalaCreateWithoutUsuariosEnSalaInput!\n}\n\ninput SalaWhereInput {\n  id: ID\n  id_not: ID\n  id_in: [ID!]\n  id_not_in: [ID!]\n  id_lt: ID\n  id_lte: ID\n  id_gt: ID\n  id_gte: ID\n  id_contains: ID\n  id_not_contains: ID\n  id_starts_with: ID\n  id_not_starts_with: ID\n  id_ends_with: ID\n  id_not_ends_with: ID\n  createdAt: DateTime\n  createdAt_not: DateTime\n  createdAt_in: [DateTime!]\n  createdAt_not_in: [DateTime!]\n  createdAt_lt: DateTime\n  createdAt_lte: DateTime\n  createdAt_gt: DateTime\n  createdAt_gte: DateTime\n  updatedAt: DateTime\n  updatedAt_not: DateTime\n  updatedAt_in: [DateTime!]\n  updatedAt_not_in: [DateTime!]\n  updatedAt_lt: DateTime\n  updatedAt_lte: DateTime\n  updatedAt_gt: DateTime\n  updatedAt_gte: DateTime\n  nombre: String\n  nombre_not: String\n  nombre_in: [String!]\n  nombre_not_in: [String!]\n  nombre_lt: String\n  nombre_lte: String\n  nombre_gt: String\n  nombre_gte: String\n  nombre_contains: String\n  nombre_not_contains: String\n  nombre_starts_with: String\n  nombre_not_starts_with: String\n  nombre_ends_with: String\n  nombre_not_ends_with: String\n  usuariosEnSala_every: UsuarioSalaWhereInput\n  usuariosEnSala_some: UsuarioSalaWhereInput\n  usuariosEnSala_none: UsuarioSalaWhereInput\n  diagramasPorUsuario_every: DiagramaUsuarioWhereInput\n  diagramasPorUsuario_some: DiagramaUsuarioWhereInput\n  diagramasPorUsuario_none: DiagramaUsuarioWhereInput\n  AND: [SalaWhereInput!]\n  OR: [SalaWhereInput!]\n  NOT: [SalaWhereInput!]\n}\n\ninput SalaWhereUniqueInput {\n  id: ID\n}\n\ntype Subscription {\n  diagrama(where: DiagramaSubscriptionWhereInput): DiagramaSubscriptionPayload\n  diagramaUsuario(where: DiagramaUsuarioSubscriptionWhereInput): DiagramaUsuarioSubscriptionPayload\n  sala(where: SalaSubscriptionWhereInput): SalaSubscriptionPayload\n  usuario(where: UsuarioSubscriptionWhereInput): UsuarioSubscriptionPayload\n  usuarioSala(where: UsuarioSalaSubscriptionWhereInput): UsuarioSalaSubscriptionPayload\n}\n\ntype Usuario {\n  id: ID!\n  createdAt: DateTime!\n  updatedAt: DateTime!\n  nombre: String!\n  esAdmin: Boolean!\n  usuariosEnSala(where: UsuarioSalaWhereInput, orderBy: UsuarioSalaOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UsuarioSala!]\n  diagramasPorUsuario(where: DiagramaUsuarioWhereInput, orderBy: DiagramaUsuarioOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DiagramaUsuario!]\n}\n\ntype UsuarioConnection {\n  pageInfo: PageInfo!\n  edges: [UsuarioEdge]!\n  aggregate: AggregateUsuario!\n}\n\ninput UsuarioCreateInput {\n  id: ID\n  nombre: String!\n  esAdmin: Boolean\n  usuariosEnSala: UsuarioSalaCreateManyWithoutUsuarioInput\n  diagramasPorUsuario: DiagramaUsuarioCreateManyWithoutUsuarioInput\n}\n\ninput UsuarioCreateOneWithoutDiagramasPorUsuarioInput {\n  create: UsuarioCreateWithoutDiagramasPorUsuarioInput\n  connect: UsuarioWhereUniqueInput\n}\n\ninput UsuarioCreateOneWithoutUsuariosEnSalaInput {\n  create: UsuarioCreateWithoutUsuariosEnSalaInput\n  connect: UsuarioWhereUniqueInput\n}\n\ninput UsuarioCreateWithoutDiagramasPorUsuarioInput {\n  id: ID\n  nombre: String!\n  esAdmin: Boolean\n  usuariosEnSala: UsuarioSalaCreateManyWithoutUsuarioInput\n}\n\ninput UsuarioCreateWithoutUsuariosEnSalaInput {\n  id: ID\n  nombre: String!\n  esAdmin: Boolean\n  diagramasPorUsuario: DiagramaUsuarioCreateManyWithoutUsuarioInput\n}\n\ntype UsuarioEdge {\n  node: Usuario!\n  cursor: String!\n}\n\nenum UsuarioOrderByInput {\n  id_ASC\n  id_DESC\n  createdAt_ASC\n  createdAt_DESC\n  updatedAt_ASC\n  updatedAt_DESC\n  nombre_ASC\n  nombre_DESC\n  esAdmin_ASC\n  esAdmin_DESC\n}\n\ntype UsuarioPreviousValues {\n  id: ID!\n  createdAt: DateTime!\n  updatedAt: DateTime!\n  nombre: String!\n  esAdmin: Boolean!\n}\n\ntype UsuarioSala {\n  id: ID!\n  createdAt: DateTime!\n  updatedAt: DateTime!\n  levantarMano: Boolean!\n  compartirPantalla: Boolean!\n  usuario: Usuario!\n  sala: Sala!\n}\n\ntype UsuarioSalaConnection {\n  pageInfo: PageInfo!\n  edges: [UsuarioSalaEdge]!\n  aggregate: AggregateUsuarioSala!\n}\n\ninput UsuarioSalaCreateInput {\n  id: ID\n  levantarMano: Boolean\n  compartirPantalla: Boolean\n  usuario: UsuarioCreateOneWithoutUsuariosEnSalaInput!\n  sala: SalaCreateOneWithoutUsuariosEnSalaInput!\n}\n\ninput UsuarioSalaCreateManyWithoutSalaInput {\n  create: [UsuarioSalaCreateWithoutSalaInput!]\n  connect: [UsuarioSalaWhereUniqueInput!]\n}\n\ninput UsuarioSalaCreateManyWithoutUsuarioInput {\n  create: [UsuarioSalaCreateWithoutUsuarioInput!]\n  connect: [UsuarioSalaWhereUniqueInput!]\n}\n\ninput UsuarioSalaCreateWithoutSalaInput {\n  id: ID\n  levantarMano: Boolean\n  compartirPantalla: Boolean\n  usuario: UsuarioCreateOneWithoutUsuariosEnSalaInput!\n}\n\ninput UsuarioSalaCreateWithoutUsuarioInput {\n  id: ID\n  levantarMano: Boolean\n  compartirPantalla: Boolean\n  sala: SalaCreateOneWithoutUsuariosEnSalaInput!\n}\n\ntype UsuarioSalaEdge {\n  node: UsuarioSala!\n  cursor: String!\n}\n\nenum UsuarioSalaOrderByInput {\n  id_ASC\n  id_DESC\n  createdAt_ASC\n  createdAt_DESC\n  updatedAt_ASC\n  updatedAt_DESC\n  levantarMano_ASC\n  levantarMano_DESC\n  compartirPantalla_ASC\n  compartirPantalla_DESC\n}\n\ntype UsuarioSalaPreviousValues {\n  id: ID!\n  createdAt: DateTime!\n  updatedAt: DateTime!\n  levantarMano: Boolean!\n  compartirPantalla: Boolean!\n}\n\ninput UsuarioSalaScalarWhereInput {\n  id: ID\n  id_not: ID\n  id_in: [ID!]\n  id_not_in: [ID!]\n  id_lt: ID\n  id_lte: ID\n  id_gt: ID\n  id_gte: ID\n  id_contains: ID\n  id_not_contains: ID\n  id_starts_with: ID\n  id_not_starts_with: ID\n  id_ends_with: ID\n  id_not_ends_with: ID\n  createdAt: DateTime\n  createdAt_not: DateTime\n  createdAt_in: [DateTime!]\n  createdAt_not_in: [DateTime!]\n  createdAt_lt: DateTime\n  createdAt_lte: DateTime\n  createdAt_gt: DateTime\n  createdAt_gte: DateTime\n  updatedAt: DateTime\n  updatedAt_not: DateTime\n  updatedAt_in: [DateTime!]\n  updatedAt_not_in: [DateTime!]\n  updatedAt_lt: DateTime\n  updatedAt_lte: DateTime\n  updatedAt_gt: DateTime\n  updatedAt_gte: DateTime\n  levantarMano: Boolean\n  levantarMano_not: Boolean\n  compartirPantalla: Boolean\n  compartirPantalla_not: Boolean\n  AND: [UsuarioSalaScalarWhereInput!]\n  OR: [UsuarioSalaScalarWhereInput!]\n  NOT: [UsuarioSalaScalarWhereInput!]\n}\n\ntype UsuarioSalaSubscriptionPayload {\n  mutation: MutationType!\n  node: UsuarioSala\n  updatedFields: [String!]\n  previousValues: UsuarioSalaPreviousValues\n}\n\ninput UsuarioSalaSubscriptionWhereInput {\n  mutation_in: [MutationType!]\n  updatedFields_contains: String\n  updatedFields_contains_every: [String!]\n  updatedFields_contains_some: [String!]\n  node: UsuarioSalaWhereInput\n  AND: [UsuarioSalaSubscriptionWhereInput!]\n  OR: [UsuarioSalaSubscriptionWhereInput!]\n  NOT: [UsuarioSalaSubscriptionWhereInput!]\n}\n\ninput UsuarioSalaUpdateInput {\n  levantarMano: Boolean\n  compartirPantalla: Boolean\n  usuario: UsuarioUpdateOneRequiredWithoutUsuariosEnSalaInput\n  sala: SalaUpdateOneRequiredWithoutUsuariosEnSalaInput\n}\n\ninput UsuarioSalaUpdateManyDataInput {\n  levantarMano: Boolean\n  compartirPantalla: Boolean\n}\n\ninput UsuarioSalaUpdateManyMutationInput {\n  levantarMano: Boolean\n  compartirPantalla: Boolean\n}\n\ninput UsuarioSalaUpdateManyWithoutSalaInput {\n  create: [UsuarioSalaCreateWithoutSalaInput!]\n  delete: [UsuarioSalaWhereUniqueInput!]\n  connect: [UsuarioSalaWhereUniqueInput!]\n  set: [UsuarioSalaWhereUniqueInput!]\n  disconnect: [UsuarioSalaWhereUniqueInput!]\n  update: [UsuarioSalaUpdateWithWhereUniqueWithoutSalaInput!]\n  upsert: [UsuarioSalaUpsertWithWhereUniqueWithoutSalaInput!]\n  deleteMany: [UsuarioSalaScalarWhereInput!]\n  updateMany: [UsuarioSalaUpdateManyWithWhereNestedInput!]\n}\n\ninput UsuarioSalaUpdateManyWithoutUsuarioInput {\n  create: [UsuarioSalaCreateWithoutUsuarioInput!]\n  delete: [UsuarioSalaWhereUniqueInput!]\n  connect: [UsuarioSalaWhereUniqueInput!]\n  set: [UsuarioSalaWhereUniqueInput!]\n  disconnect: [UsuarioSalaWhereUniqueInput!]\n  update: [UsuarioSalaUpdateWithWhereUniqueWithoutUsuarioInput!]\n  upsert: [UsuarioSalaUpsertWithWhereUniqueWithoutUsuarioInput!]\n  deleteMany: [UsuarioSalaScalarWhereInput!]\n  updateMany: [UsuarioSalaUpdateManyWithWhereNestedInput!]\n}\n\ninput UsuarioSalaUpdateManyWithWhereNestedInput {\n  where: UsuarioSalaScalarWhereInput!\n  data: UsuarioSalaUpdateManyDataInput!\n}\n\ninput UsuarioSalaUpdateWithoutSalaDataInput {\n  levantarMano: Boolean\n  compartirPantalla: Boolean\n  usuario: UsuarioUpdateOneRequiredWithoutUsuariosEnSalaInput\n}\n\ninput UsuarioSalaUpdateWithoutUsuarioDataInput {\n  levantarMano: Boolean\n  compartirPantalla: Boolean\n  sala: SalaUpdateOneRequiredWithoutUsuariosEnSalaInput\n}\n\ninput UsuarioSalaUpdateWithWhereUniqueWithoutSalaInput {\n  where: UsuarioSalaWhereUniqueInput!\n  data: UsuarioSalaUpdateWithoutSalaDataInput!\n}\n\ninput UsuarioSalaUpdateWithWhereUniqueWithoutUsuarioInput {\n  where: UsuarioSalaWhereUniqueInput!\n  data: UsuarioSalaUpdateWithoutUsuarioDataInput!\n}\n\ninput UsuarioSalaUpsertWithWhereUniqueWithoutSalaInput {\n  where: UsuarioSalaWhereUniqueInput!\n  update: UsuarioSalaUpdateWithoutSalaDataInput!\n  create: UsuarioSalaCreateWithoutSalaInput!\n}\n\ninput UsuarioSalaUpsertWithWhereUniqueWithoutUsuarioInput {\n  where: UsuarioSalaWhereUniqueInput!\n  update: UsuarioSalaUpdateWithoutUsuarioDataInput!\n  create: UsuarioSalaCreateWithoutUsuarioInput!\n}\n\ninput UsuarioSalaWhereInput {\n  id: ID\n  id_not: ID\n  id_in: [ID!]\n  id_not_in: [ID!]\n  id_lt: ID\n  id_lte: ID\n  id_gt: ID\n  id_gte: ID\n  id_contains: ID\n  id_not_contains: ID\n  id_starts_with: ID\n  id_not_starts_with: ID\n  id_ends_with: ID\n  id_not_ends_with: ID\n  createdAt: DateTime\n  createdAt_not: DateTime\n  createdAt_in: [DateTime!]\n  createdAt_not_in: [DateTime!]\n  createdAt_lt: DateTime\n  createdAt_lte: DateTime\n  createdAt_gt: DateTime\n  createdAt_gte: DateTime\n  updatedAt: DateTime\n  updatedAt_not: DateTime\n  updatedAt_in: [DateTime!]\n  updatedAt_not_in: [DateTime!]\n  updatedAt_lt: DateTime\n  updatedAt_lte: DateTime\n  updatedAt_gt: DateTime\n  updatedAt_gte: DateTime\n  levantarMano: Boolean\n  levantarMano_not: Boolean\n  compartirPantalla: Boolean\n  compartirPantalla_not: Boolean\n  usuario: UsuarioWhereInput\n  sala: SalaWhereInput\n  AND: [UsuarioSalaWhereInput!]\n  OR: [UsuarioSalaWhereInput!]\n  NOT: [UsuarioSalaWhereInput!]\n}\n\ninput UsuarioSalaWhereUniqueInput {\n  id: ID\n}\n\ntype UsuarioSubscriptionPayload {\n  mutation: MutationType!\n  node: Usuario\n  updatedFields: [String!]\n  previousValues: UsuarioPreviousValues\n}\n\ninput UsuarioSubscriptionWhereInput {\n  mutation_in: [MutationType!]\n  updatedFields_contains: String\n  updatedFields_contains_every: [String!]\n  updatedFields_contains_some: [String!]\n  node: UsuarioWhereInput\n  AND: [UsuarioSubscriptionWhereInput!]\n  OR: [UsuarioSubscriptionWhereInput!]\n  NOT: [UsuarioSubscriptionWhereInput!]\n}\n\ninput UsuarioUpdateInput {\n  nombre: String\n  esAdmin: Boolean\n  usuariosEnSala: UsuarioSalaUpdateManyWithoutUsuarioInput\n  diagramasPorUsuario: DiagramaUsuarioUpdateManyWithoutUsuarioInput\n}\n\ninput UsuarioUpdateManyMutationInput {\n  nombre: String\n  esAdmin: Boolean\n}\n\ninput UsuarioUpdateOneRequiredWithoutDiagramasPorUsuarioInput {\n  create: UsuarioCreateWithoutDiagramasPorUsuarioInput\n  update: UsuarioUpdateWithoutDiagramasPorUsuarioDataInput\n  upsert: UsuarioUpsertWithoutDiagramasPorUsuarioInput\n  connect: UsuarioWhereUniqueInput\n}\n\ninput UsuarioUpdateOneRequiredWithoutUsuariosEnSalaInput {\n  create: UsuarioCreateWithoutUsuariosEnSalaInput\n  update: UsuarioUpdateWithoutUsuariosEnSalaDataInput\n  upsert: UsuarioUpsertWithoutUsuariosEnSalaInput\n  connect: UsuarioWhereUniqueInput\n}\n\ninput UsuarioUpdateWithoutDiagramasPorUsuarioDataInput {\n  nombre: String\n  esAdmin: Boolean\n  usuariosEnSala: UsuarioSalaUpdateManyWithoutUsuarioInput\n}\n\ninput UsuarioUpdateWithoutUsuariosEnSalaDataInput {\n  nombre: String\n  esAdmin: Boolean\n  diagramasPorUsuario: DiagramaUsuarioUpdateManyWithoutUsuarioInput\n}\n\ninput UsuarioUpsertWithoutDiagramasPorUsuarioInput {\n  update: UsuarioUpdateWithoutDiagramasPorUsuarioDataInput!\n  create: UsuarioCreateWithoutDiagramasPorUsuarioInput!\n}\n\ninput UsuarioUpsertWithoutUsuariosEnSalaInput {\n  update: UsuarioUpdateWithoutUsuariosEnSalaDataInput!\n  create: UsuarioCreateWithoutUsuariosEnSalaInput!\n}\n\ninput UsuarioWhereInput {\n  id: ID\n  id_not: ID\n  id_in: [ID!]\n  id_not_in: [ID!]\n  id_lt: ID\n  id_lte: ID\n  id_gt: ID\n  id_gte: ID\n  id_contains: ID\n  id_not_contains: ID\n  id_starts_with: ID\n  id_not_starts_with: ID\n  id_ends_with: ID\n  id_not_ends_with: ID\n  createdAt: DateTime\n  createdAt_not: DateTime\n  createdAt_in: [DateTime!]\n  createdAt_not_in: [DateTime!]\n  createdAt_lt: DateTime\n  createdAt_lte: DateTime\n  createdAt_gt: DateTime\n  createdAt_gte: DateTime\n  updatedAt: DateTime\n  updatedAt_not: DateTime\n  updatedAt_in: [DateTime!]\n  updatedAt_not_in: [DateTime!]\n  updatedAt_lt: DateTime\n  updatedAt_lte: DateTime\n  updatedAt_gt: DateTime\n  updatedAt_gte: DateTime\n  nombre: String\n  nombre_not: String\n  nombre_in: [String!]\n  nombre_not_in: [String!]\n  nombre_lt: String\n  nombre_lte: String\n  nombre_gt: String\n  nombre_gte: String\n  nombre_contains: String\n  nombre_not_contains: String\n  nombre_starts_with: String\n  nombre_not_starts_with: String\n  nombre_ends_with: String\n  nombre_not_ends_with: String\n  esAdmin: Boolean\n  esAdmin_not: Boolean\n  usuariosEnSala_every: UsuarioSalaWhereInput\n  usuariosEnSala_some: UsuarioSalaWhereInput\n  usuariosEnSala_none: UsuarioSalaWhereInput\n  diagramasPorUsuario_every: DiagramaUsuarioWhereInput\n  diagramasPorUsuario_some: DiagramaUsuarioWhereInput\n  diagramasPorUsuario_none: DiagramaUsuarioWhereInput\n  AND: [UsuarioWhereInput!]\n  OR: [UsuarioWhereInput!]\n  NOT: [UsuarioWhereInput!]\n}\n\ninput UsuarioWhereUniqueInput {\n  id: ID\n}\n";