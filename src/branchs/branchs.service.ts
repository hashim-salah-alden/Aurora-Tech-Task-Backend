import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BranchsService {
  constructor(private prisma: PrismaService) {}

  // create(createBranchDto: CreateBranchDto) {
  //   return 'This action adds a new branch';
  // }

  async findAll() {
    const branchs = await this.prisma.branch.findMany({
      where:{
        
      },
      include: {
        reservations: true,
        schedules: true,
      },
    });
    return branchs;
  }

  async findOne(id: string) {
    const branch = await this.prisma.branch.findUnique({ where: { id } });
    if (!branch) throw new NotFoundException();

    return branch;
  }

  // update(id: number, updateBranchDto: UpdateBranchDto) {
  //   return `This action updates a #${id} branch`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} branch`;
  // }
}


// {
//   "id": "38db8f0d-a4aa-4e99-884b-e82d8336a9ba",
//   "firstName": "Doctor",
//   "lastName": "One",
//   "email": "doctor1@gmail.com",
//   "phone": "01500090697",
//   "doctorImage": null,
//   "schedules": [
//       {
//           "id": "925f651d-f10f-4c68-bacc-e348dde9293c",
//           "doctorId": "38db8f0d-a4aa-4e99-884b-e82d8336a9ba",
//           "branchId": "084700a8-2014-4292-bcd1-35a9f31ab073",
//           "startingTime": "02:47",
//           "endingTime": "07:47",
//           "workingWeekdays": [
//               "[\"Tues\",\"Wed\"]"
//           ]
//       },
//       {
//           "id": "b9696019-caa2-4487-84d6-d0717a4607e3",
//           "doctorId": "38db8f0d-a4aa-4e99-884b-e82d8336a9ba",
//           "branchId": "50908783-abed-4a30-a00b-5ec6512b188c",
//           "startingTime": "01:47",
//           "endingTime": "04:47",
//           "workingWeekdays": [
//               "[\"Sat\",\"Sun\",\"Mon\"]"
//           ]
//       }
//   ]
// },